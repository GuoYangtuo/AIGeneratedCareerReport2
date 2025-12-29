'use client';

import { ConsultantInfo } from '@/types/report';

interface Props {
  data: ConsultantInfo;
  onChange: (data: ConsultantInfo) => void;
}

export default function ConsultantForm({ data, onChange }: Props) {
  const handleChange = (field: keyof ConsultantInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <h2 className="form-section-title">
        <span className="inline-flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          咨询老师信息
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="form-label">老师姓名 *</label>
          <input
            type="text"
            className="form-input"
            placeholder="请输入咨询老师姓名"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div>
          <label className="form-label">联系电话 *</label>
          <input
            type="tel"
            className="form-input"
            placeholder="请输入联系电话"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div>
          <label className="form-label">微信号（同号）</label>
          <input
            type="text"
            className="form-input"
            placeholder="如与电话相同可留空"
            value={data.wechat}
            onChange={(e) => handleChange('wechat', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">留空则默认与电话号码相同</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-light-bg rounded-lg border border-accent">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-gray-700">
              咨询老师信息将显示在报告封面页，方便学生和家长后续联系。
            </p>
            <p className="text-sm text-gray-500 mt-1">
              出品机构：中海皓联教育科技集团 - 华芯百科
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

