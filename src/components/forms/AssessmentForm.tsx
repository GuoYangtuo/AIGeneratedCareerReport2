'use client';

import { AssessmentData } from '@/types/report';
import { useState } from 'react';

interface Props {
  data: AssessmentData;
  onChange: (data: AssessmentData) => void;
}

const personalityTypes = [
  '战略规划型',
  '务实行动型',
  '创新探索型',
  '社交影响型',
  '分析研究型',
  '艺术创意型',
  '服务助人型',
  '领导决策型'
];

const interestOptions = [
  '科学研究', '工程技术', '数据分析', '商业管理',
  '艺术设计', '文学创作', '社会服务', '教育培训',
  '医疗健康', '法律政务', '金融投资', '传媒娱乐'
];

const subjectOptions = [
  '语文', '数学', '英语', '物理', '化学', '生物',
  '历史', '地理', '政治', '信息技术', '艺术', '体育'
];

export default function AssessmentForm({ data, onChange }: Props) {
  const [newStrength, setNewStrength] = useState('');
  const [newWeakness, setNewWeakness] = useState('');
  const [newPattern, setNewPattern] = useState('');

  const handleChange = <K extends keyof AssessmentData>(
    field: K,
    value: AssessmentData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const addItem = (
    field: 'strengths' | 'weaknesses',
    value: string,
    clearFn: (v: string) => void
  ) => {
    if (!value.trim()) return;
    const traits = { ...data.personalityTraits };
    traits[field] = [...traits[field], value.trim()];
    handleChange('personalityTraits', traits);
    clearFn('');
  };

  const removeItem = (field: 'strengths' | 'weaknesses', index: number) => {
    const traits = { ...data.personalityTraits };
    traits[field] = traits[field].filter((_, i) => i !== index);
    handleChange('personalityTraits', traits);
  };

  const addPattern = () => {
    if (!newPattern.trim()) return;
    handleChange('thinkingPatterns', [...data.thinkingPatterns, newPattern.trim()]);
    setNewPattern('');
  };

  const removePattern = (index: number) => {
    handleChange('thinkingPatterns', data.thinkingPatterns.filter((_, i) => i !== index));
  };

  const toggleArrayItem = (field: 'interestTendency' | 'subjectStrengths', item: string) => {
    const current = data[field];
    if (current.includes(item)) {
      handleChange(field, current.filter((i) => i !== item));
    } else {
      handleChange(field, [...current, item]);
    }
  };

  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 className="form-section-title">
        <span className="inline-flex items-center gap-2">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          测评数据
        </span>
      </h2>

      {/* 人格类型 */}
      <div className="mb-4 sm:mb-6">
        <label className="form-label">人格核心类型 *</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-2">
          {personalityTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleChange('personalityType', type)}
              className={`p-2 sm:p-3 rounded-lg border-2 transition-all text-xs sm:text-sm font-medium ${
                data.personalityType === type
                  ? 'border-primary bg-primary text-white shadow-md'
                  : 'border-gray-200 hover:border-secondary hover:bg-light-bg'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 性格优势 */}
      <div className="mb-4 sm:mb-6">
        <label className="form-label">性格优势 *（至少3点）</label>
        <div className="flex flex-col sm:flex-row gap-2 mb-2">
          <input
            type="text"
            className="form-input flex-1"
            placeholder="输入一个性格优势"
            value={newStrength}
            onChange={(e) => setNewStrength(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem('strengths', newStrength, setNewStrength)}
          />
          <button
            type="button"
            onClick={() => addItem('strengths', newStrength, setNewStrength)}
            className="btn-primary text-sm py-2"
          >
            添加
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {data.personalityTraits.strengths.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm"
            >
              <span className="truncate max-w-[150px] sm:max-w-none">{item}</span>
              <button
                type="button"
                onClick={() => removeItem('strengths', index)}
                className="hover:text-red-500 flex-shrink-0"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        {data.personalityTraits.strengths.length < 3 && (
          <p className="text-xs sm:text-sm text-orange-500 mt-1">还需添加 {3 - data.personalityTraits.strengths.length} 个优势</p>
        )}
      </div>

      {/* 性格缺点 */}
      <div className="mb-4 sm:mb-6">
        <label className="form-label">性格缺点 *（至少3点）</label>
        <div className="flex flex-col sm:flex-row gap-2 mb-2">
          <input
            type="text"
            className="form-input flex-1"
            placeholder="输入一个性格缺点"
            value={newWeakness}
            onChange={(e) => setNewWeakness(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem('weaknesses', newWeakness, setNewWeakness)}
          />
          <button
            type="button"
            onClick={() => addItem('weaknesses', newWeakness, setNewWeakness)}
            className="btn-primary text-sm py-2"
          >
            添加
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {data.personalityTraits.weaknesses.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm"
            >
              <span className="truncate max-w-[150px] sm:max-w-none">{item}</span>
              <button
                type="button"
                onClick={() => removeItem('weaknesses', index)}
                className="hover:text-red-500 flex-shrink-0"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        {data.personalityTraits.weaknesses.length < 3 && (
          <p className="text-xs sm:text-sm text-orange-500 mt-1">还需添加 {3 - data.personalityTraits.weaknesses.length} 个缺点</p>
        )}
      </div>

      {/* 思维模式 */}
      <div className="mb-4 sm:mb-6">
        <label className="form-label">思维模式/行为特点 *（至少3条）</label>
        <div className="flex flex-col sm:flex-row gap-2 mb-2">
          <input
            type="text"
            className="form-input flex-1"
            placeholder="描述思维或行为特点"
            value={newPattern}
            onChange={(e) => setNewPattern(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addPattern()}
          />
          <button type="button" onClick={addPattern} className="btn-primary text-sm py-2">
            添加
          </button>
        </div>
        <div className="space-y-2">
          {data.thinkingPatterns.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg gap-2"
            >
              <span className="text-blue-700 text-xs sm:text-sm">{item}</span>
              <button
                type="button"
                onClick={() => removePattern(index)}
                className="text-red-500 hover:text-red-700 text-xs sm:text-sm flex-shrink-0"
              >
                删除
              </button>
            </div>
          ))}
        </div>
        {data.thinkingPatterns.length < 3 && (
          <p className="text-xs sm:text-sm text-orange-500 mt-1">还需添加 {3 - data.thinkingPatterns.length} 条描述</p>
        )}
      </div>

      {/* 兴趣倾向 */}
      <div className="mb-4 sm:mb-6">
        <label className="form-label">兴趣倾向 *（选择多项）</label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2 mt-2">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleArrayItem('interestTendency', interest)}
              className={`p-1.5 sm:p-2 rounded-lg border text-xs sm:text-sm transition-all ${
                data.interestTendency.includes(interest)
                  ? 'border-secondary bg-secondary text-white'
                  : 'border-gray-200 hover:border-secondary hover:bg-light-bg'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* 学科优势 */}
      <div>
        <label className="form-label">学科优势 *（至少选择2科）</label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 sm:gap-2 mt-2">
          {subjectOptions.map((subject) => (
            <button
              key={subject}
              type="button"
              onClick={() => toggleArrayItem('subjectStrengths', subject)}
              className={`p-1.5 sm:p-2 rounded-lg border text-xs sm:text-sm transition-all ${
                data.subjectStrengths.includes(subject)
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 hover:border-primary hover:bg-light-bg'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
        {data.subjectStrengths.length < 2 && (
          <p className="text-xs sm:text-sm text-orange-500 mt-1">还需选择 {2 - data.subjectStrengths.length} 个学科</p>
        )}
      </div>
    </div>
  );
}
