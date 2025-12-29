'use client';

import { useState, useCallback } from 'react';
import StudentInfoForm from '@/components/forms/StudentInfoForm';
import AssessmentForm from '@/components/forms/AssessmentForm';
import FamilyInfoForm from '@/components/forms/FamilyInfoForm';
import SpecialCircumstancesForm from '@/components/forms/SpecialCircumstancesForm';
import ConsultantForm from '@/components/forms/ConsultantForm';
import { 
  sampleStudentInfo,
  sampleAssessmentData,
  sampleFamilyInfo,
  sampleSpecialCircumstances,
  sampleConsultantInfo,
  sampleGeneratedContent
} from '@/lib/sampleData';
import type { 
  StudentInfo, 
  AssessmentData, 
  FamilyInfo, 
  SpecialCircumstances, 
  ConsultantInfo,
  ReportInputData,
  FullReportData
} from '@/types/report';

// 初始状态
const initialStudentInfo: StudentInfo = {
  name: '',
  grade: '高一',
  currentPerformance: '中等',
  targetDegree: '本科',
  school: '',
  major: ''
};

const initialAssessmentData: AssessmentData = {
  personalityType: '',
  personalityTraits: {
    strengths: [],
    weaknesses: []
  },
  thinkingPatterns: [],
  interestTendency: [],
  subjectStrengths: []
};

const initialFamilyInfo: FamilyInfo = {
  structure: '',
  parentOccupation: '',
  budget: '',
  resources: [],
  demands: {
    educationGoal: '',
    careerExpectation: '',
    locationPreference: ''
  }
};

const initialSpecialCircumstances: SpecialCircumstances = {
  hasAcademicIssues: false,
  academicIssuesDetail: '',
  hasSpecialPlanning: false,
  specialPlanningDetail: '',
  lacksResources: false,
  lacksResourcesDetail: ''
};

const initialConsultantInfo: ConsultantInfo = {
  name: '',
  phone: '',
  wechat: ''
};

type Step = 'input' | 'generating' | 'preview';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('input');
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [generatingMessage, setGeneratingMessage] = useState('');
  const [error, setError] = useState('');
  const [reportData, setReportData] = useState<FullReportData | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // 表单数据
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(initialStudentInfo);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>(initialAssessmentData);
  const [familyInfo, setFamilyInfo] = useState<FamilyInfo>(initialFamilyInfo);
  const [specialCircumstances, setSpecialCircumstances] = useState<SpecialCircumstances>(initialSpecialCircumstances);
  const [consultantInfo, setConsultantInfo] = useState<ConsultantInfo>(initialConsultantInfo);

  // 表单验证
  const validateForm = useCallback(() => {
    const errors: string[] = [];
    
    if (!studentInfo.name) errors.push('请填写学生姓名');
    if (!studentInfo.grade) errors.push('请选择年级');
    if (!assessmentData.personalityType) errors.push('请选择人格类型');
    if (assessmentData.personalityTraits.strengths.length < 3) errors.push('性格优势至少需要3点');
    if (assessmentData.personalityTraits.weaknesses.length < 3) errors.push('性格缺点至少需要3点');
    if (assessmentData.thinkingPatterns.length < 3) errors.push('思维模式至少需要3条');
    if (assessmentData.interestTendency.length === 0) errors.push('请选择兴趣倾向');
    if (assessmentData.subjectStrengths.length < 2) errors.push('学科优势至少需要2科');
    if (!familyInfo.structure) errors.push('请填写家庭结构');
    if (!familyInfo.parentOccupation) errors.push('请填写父母职业');
    if (!familyInfo.budget) errors.push('请选择经济预算');
    if (!familyInfo.demands.educationGoal) errors.push('请填写升学目标');
    if (!familyInfo.demands.careerExpectation) errors.push('请填写就业期望');
    if (!familyInfo.demands.locationPreference) errors.push('请填写地域偏好');
    if (!consultantInfo.name) errors.push('请填写咨询老师姓名');
    if (!consultantInfo.phone) errors.push('请填写咨询老师电话');

    return errors;
  }, [studentInfo, assessmentData, familyInfo, consultantInfo]);

  // 生成报告
  const handleGenerate = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    setError('');
    setCurrentStep('generating');
    setGeneratingProgress(0);

    const input: ReportInputData = {
      studentInfo,
      assessmentData,
      familyInfo,
      specialCircumstances,
      consultantInfo: {
        ...consultantInfo,
        wechat: consultantInfo.wechat || consultantInfo.phone
      }
    };

    try {
      // 模拟进度更新
      const progressMessages = [
        '正在分析学生性格特质...',
        '正在匹配职业发展方向...',
        '正在生成规划建议...',
        '正在筛选升学项目...',
        '正在制定时间规划...',
        '正在整理供应链资源...',
        '正在生成报告总结...'
      ];

      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        setGeneratingProgress(Math.floor(progress));
        const msgIndex = Math.floor((progress / 100) * progressMessages.length);
        setGeneratingMessage(progressMessages[Math.min(msgIndex, progressMessages.length - 1)]);
      }, 1000);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '生成失败');
      }

      const result = await response.json();
      setReportData(result.data);
      setGeneratingProgress(100);
      setGeneratingMessage('报告生成完成！');
      
      setTimeout(() => {
        setCurrentStep('preview');
      }, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : '生成报告失败，请重试');
      setCurrentStep('input');
    }
  };

  // 下载 PDF
  const handleDownloadPdf = async () => {
    if (!reportData) return;

    setDownloadingPdf(true);
    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportData })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'PDF 生成失败');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
      a.download = `${studentInfo.name}-${studentInfo.grade}-生涯定制报告-${dateStr}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF 下载失败');
    } finally {
      setDownloadingPdf(false);
    }
  };

  // 返回编辑
  const handleBackToEdit = () => {
    setCurrentStep('input');
  };

  // 重新生成
  const handleRegenerate = () => {
    setReportData(null);
    handleGenerate();
  };

  // 加载示例数据
  const loadSampleData = () => {
    setStudentInfo(sampleStudentInfo);
    setAssessmentData(sampleAssessmentData);
    setFamilyInfo(sampleFamilyInfo);
    setSpecialCircumstances(sampleSpecialCircumstances);
    setConsultantInfo(sampleConsultantInfo);
  };

  // 演示模式（无需 API Key）
  const handleDemoMode = async () => {
    loadSampleData();
    setError('');
    setCurrentStep('generating');
    setGeneratingProgress(0);

    const progressMessages = [
      '正在加载演示数据...',
      '正在分析学生性格特质...',
      '正在匹配职业发展方向...',
      '正在生成规划建议...',
      '正在整理报告内容...'
    ];

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 20;
      if (progress > 90) progress = 90;
      setGeneratingProgress(Math.floor(progress));
      const msgIndex = Math.floor((progress / 100) * progressMessages.length);
      setGeneratingMessage(progressMessages[Math.min(msgIndex, progressMessages.length - 1)]);
    }, 500);

    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 3000));

    clearInterval(progressInterval);

    const demoReport: FullReportData = {
      input: {
        studentInfo: sampleStudentInfo,
        assessmentData: sampleAssessmentData,
        familyInfo: sampleFamilyInfo,
        specialCircumstances: sampleSpecialCircumstances,
        consultantInfo: sampleConsultantInfo
      },
      generated: sampleGeneratedContent,
      generatedAt: new Date().toISOString()
    };

    setReportData(demoReport);
    setGeneratingProgress(100);
    setGeneratingMessage('演示报告生成完成！');

    setTimeout(() => {
      setCurrentStep('preview');
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-light-bg via-white to-accent/20">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          {/* 移动端顶部 Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-base sm:text-lg">
                华
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-primary">华芯百科</h1>
                <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">AI 智能生涯规划系统</p>
              </div>
            </div>
            
            {/* 桌面端导航按钮 */}
            {currentStep === 'input' && (
              <div className="hidden lg:flex items-center gap-4">
                <button onClick={handleGenerate} className="btn-primary flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  生成报告
                </button>
              </div>
            )}

            {currentStep === 'preview' && (
              <div className="hidden sm:flex items-center gap-2 sm:gap-3">
                <button onClick={handleBackToEdit} className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all text-sm">
                  返回编辑
                </button>
                <button onClick={handleRegenerate} className="btn-secondary text-sm hidden md:block">
                  重新生成
                </button>
                <button 
                  onClick={handleDownloadPdf} 
                  disabled={downloadingPdf}
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  {downloadingPdf ? (
                    <>
                      <div className="w-4 h-4 spinner" />
                      <span className="hidden sm:inline">生成中...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="hidden sm:inline">下载 PDF</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          
          
          {/* 移动端预览操作栏 */}
          {currentStep === 'preview' && (
            <div className="sm:hidden mt-3 flex gap-2">
              <button onClick={handleBackToEdit} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm">
                返回
              </button>
              <button 
                onClick={handleDownloadPdf} 
                disabled={downloadingPdf}
                className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm"
              >
                {downloadingPdf ? (
                  <div className="w-4 h-4 spinner" />
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    下载 PDF
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 错误提示 */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-3 sm:mt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-red-700 whitespace-pre-line text-xs sm:text-sm">{error}</p>
            </div>
            <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 输入表单 */}
      {currentStep === 'input' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">学生生涯规划信息采集</h2>
            <p className="text-sm sm:text-base text-gray-500">请填写以下信息，AI 将为您生成个性化的生涯定制报告</p>
          </div>

          <StudentInfoForm data={studentInfo} onChange={setStudentInfo} />
          <AssessmentForm data={assessmentData} onChange={setAssessmentData} />
          <FamilyInfoForm data={familyInfo} onChange={setFamilyInfo} />
          <SpecialCircumstancesForm data={specialCircumstances} onChange={setSpecialCircumstances} />
          <ConsultantForm data={consultantInfo} onChange={setConsultantInfo} />

          {/* 底部生成按钮 */}
          <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 sm:gap-4">
            <button 
              onClick={handleGenerate}
              className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              开始生成报告
            </button>
            
            <div className="flex items-center gap-3 sm:gap-4 text-sm text-gray-500">
              <button 
                onClick={handleDemoMode}
                className="text-secondary hover:text-primary underline font-medium"
              >
                查看演示报告
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={loadSampleData}
                className="text-secondary hover:text-primary underline font-medium"
              >
                加载示例数据
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 生成中 */}
      {currentStep === 'generating' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-accent"></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                  style={{ animationDuration: '1s' }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{generatingProgress}%</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">正在生成报告</h3>
              <p className="text-gray-500 mb-6">{generatingMessage}</p>

              <div className="progress-bar">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${generatingProgress}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-400 mt-4">
                AI 正在分析数据并生成个性化内容，请耐心等待...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 报告预览 */}
      {currentStep === 'preview' && reportData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary p-4 sm:p-6 text-white">
              <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{studentInfo.name} - 生涯定制报告</h2>
              <p className="text-white/80 text-sm sm:text-base">
                生成时间：{new Date(reportData.generatedAt).toLocaleString('zh-CN')}
              </p>
            </div>

            <div className="p-4 sm:p-6">
              {/* 报告概览卡片 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
                <div className="card p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500">人格类型</p>
                      <p className="font-bold text-primary text-sm sm:text-base truncate">{reportData.generated.personalityAnalysis.coreType.split('-')[0]}</p>
                    </div>
                  </div>
                </div>

                <div className="card p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">职业方向</p>
                      <p className="font-bold text-secondary text-sm sm:text-base">{reportData.generated.careerMatches.length} 个推荐方向</p>
                    </div>
                  </div>
                </div>

                <div className="card p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">升学项目</p>
                      <p className="font-bold text-primary text-sm sm:text-base">{reportData.generated.educationProjects.length} 个推荐项目</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 职业匹配预览 */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">职业适配分析</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  {reportData.generated.careerMatches.map((career, index) => (
                    <div key={index} className="card p-3 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                          {index + 1}
                        </span>
                        <h4 className="font-bold text-primary text-sm sm:text-base">{career.direction}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">{career.matchReason}</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {career.positions.slice(0, 3).map((pos, pIndex) => (
                          <span key={pIndex} className="tag text-xs">{pos}</span>
                        ))}
                        {career.positions.length > 3 && (
                          <span className="tag text-xs">+{career.positions.length - 3}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 发展路径预览 */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">核心发展路径</h3>
                <div className="space-y-3 sm:space-y-4">
                  {reportData.generated.developmentPaths.map((path, index) => (
                    <div key={index} className="flex bg-light-bg rounded-lg overflow-hidden">
                      <div className="w-10 sm:w-12 bg-gradient-to-b from-primary to-secondary flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">升学方向</p>
                          <p className="font-medium text-primary text-xs sm:text-sm">{path.educationDirection}</p>
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">职业目标</p>
                          <p className="font-medium text-secondary text-xs sm:text-sm">{path.careerGoal}</p>
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">资源适配</p>
                          <p className="font-medium text-xs sm:text-sm">{path.resourceMatch}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 行动建议预览 */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">后续行动建议</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {reportData.generated.summary.actionSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-lg border border-accent">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold flex-shrink-0 text-xs sm:text-sm">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 text-xs sm:text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 底部操作栏 */}
            <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                报告共包含 10 个页面的详细内容
              </p>
              <button 
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 text-sm"
              >
                {downloadingPdf ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 spinner" />
                    正在生成 PDF...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    下载完整 PDF 报告
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底部信息 */}
      <footer className="mt-auto py-6 sm:py-8 text-center text-gray-500 text-xs sm:text-sm px-4">
        <p>© 2024 中海皓联教育科技集团 - 华芯百科 版权所有</p>
        <p className="mt-1">联系电话：021-52729115</p>
        <p className="sm:hidden">邮箱：contact@huaxinbaike.com</p>
        <p className="hidden sm:block mt-1">邮箱：contact@huaxinbaike.com</p>
      </footer>
    </main>
  );
}
