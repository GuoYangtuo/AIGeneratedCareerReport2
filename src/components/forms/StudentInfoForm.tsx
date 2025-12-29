'use client';

import { StudentInfo } from '@/types/report';

interface Props {
  data: StudentInfo;
  onChange: (data: StudentInfo) => void;
}

const gradeOptions = [
  '初一', '初二', '初三',
  '高一', '高二', '高三',
  '大一', '大二', '大三', '大四'
] as const;

const performanceOptions = ['优秀', '中等', '待提升'] as const;
const degreeOptions = ['本科', '硕士', '博士'] as const;

export default function StudentInfoForm({ data, onChange }: Props) {
  const handleChange = (field: keyof StudentInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="form-section animate-fade-in">
      <h2 className="form-section-title">
        <span className="inline-flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          学生基础信息
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">学生姓名 *</label>
          <input
            type="text"
            className="form-input"
            placeholder="请输入学生姓名"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div>
          <label className="form-label">当前年级 *</label>
          <select
            className="form-input"
            value={data.grade}
            onChange={(e) => handleChange('grade', e.target.value)}
          >
            <option value="">请选择年级</option>
            {gradeOptions.map((grade) => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">当前成绩水平 *</label>
          <div className="flex gap-4 mt-2">
            {performanceOptions.map((level) => (
              <label key={level} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="performance"
                  value={level}
                  checked={data.currentPerformance === level}
                  onChange={(e) => handleChange('currentPerformance', e.target.value)}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className={`px-3 py-1 rounded-full text-sm transition-all ${
                  data.currentPerformance === level 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-accent'
                }`}>
                  {level}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="form-label">目标学历 *</label>
          <div className="flex gap-4 mt-2">
            {degreeOptions.map((degree) => (
              <label key={degree} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="degree"
                  value={degree}
                  checked={data.targetDegree === degree}
                  onChange={(e) => handleChange('targetDegree', e.target.value)}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className={`px-3 py-1 rounded-full text-sm transition-all ${
                  data.targetDegree === degree 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-accent'
                }`}>
                  {degree}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="form-label">就读学校（选填）</label>
          <input
            type="text"
            className="form-input"
            placeholder="请输入学校名称"
            value={data.school || ''}
            onChange={(e) => handleChange('school', e.target.value)}
          />
        </div>

        <div>
          <label className="form-label">专业方向（选填）</label>
          <input
            type="text"
            className="form-input"
            placeholder="如有意向专业请填写"
            value={data.major || ''}
            onChange={(e) => handleChange('major', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

