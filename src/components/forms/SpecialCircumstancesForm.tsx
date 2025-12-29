'use client';

import { SpecialCircumstances } from '@/types/report';

interface Props {
  data: SpecialCircumstances;
  onChange: (data: SpecialCircumstances) => void;
}

export default function SpecialCircumstancesForm({ data, onChange }: Props) {
  const handleToggle = (field: keyof SpecialCircumstances) => {
    const newData = { ...data };
    if (typeof newData[field] === 'boolean') {
      (newData[field] as boolean) = !newData[field];
    }
    onChange(newData);
  };

  const handleDetailChange = (field: keyof SpecialCircumstances, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <h2 className="form-section-title">
        <span className="inline-flex items-center gap-2">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          特殊情况说明
        </span>
      </h2>

      <div className="space-y-3 sm:space-y-6">
        {/* 考学问题 */}
        <div className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-secondary transition-all">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                data.hasAcademicIssues ? 'bg-orange-100' : 'bg-gray-100'
              }`}>
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${data.hasAcademicIssues ? 'text-orange-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">是否有考学问题？</h4>
                <p className="text-xs sm:text-sm text-gray-500 truncate">如：偏科、成绩波动等</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('hasAcademicIssues')}
              className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                data.hasAcademicIssues ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                  data.hasAcademicIssues ? 'translate-x-4 sm:translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {data.hasAcademicIssues && (
            <textarea
              className="form-input mt-2"
              placeholder="请详细描述考学问题..."
              value={data.academicIssuesDetail || ''}
              onChange={(e) => handleDetailChange('academicIssuesDetail', e.target.value)}
              rows={2}
            />
          )}
        </div>

        {/* 特色规划 */}
        <div className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-secondary transition-all">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                data.hasSpecialPlanning ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${data.hasSpecialPlanning ? 'text-purple-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">是否有特色规划？</h4>
                <p className="text-xs sm:text-sm text-gray-500 truncate">如：艺术、体育特长等</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('hasSpecialPlanning')}
              className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                data.hasSpecialPlanning ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                  data.hasSpecialPlanning ? 'translate-x-4 sm:translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {data.hasSpecialPlanning && (
            <textarea
              className="form-input mt-2"
              placeholder="请详细描述特长或特色规划..."
              value={data.specialPlanningDetail || ''}
              onChange={(e) => handleDetailChange('specialPlanningDetail', e.target.value)}
              rows={2}
            />
          )}
        </div>

        {/* 资源缺乏 */}
        <div className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-secondary transition-all">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                data.lacksResources ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${data.lacksResources ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">是否缺乏资源？</h4>
                <p className="text-xs sm:text-sm text-gray-500 truncate">如：竞赛、实习机会等</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('lacksResources')}
              className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                data.lacksResources ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                  data.lacksResources ? 'translate-x-4 sm:translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {data.lacksResources && (
            <textarea
              className="form-input mt-2"
              placeholder="请详细描述需要的资源..."
              value={data.lacksResourcesDetail || ''}
              onChange={(e) => handleDetailChange('lacksResourcesDetail', e.target.value)}
              rows={2}
            />
          )}
        </div>
      </div>
    </div>
  );
}
