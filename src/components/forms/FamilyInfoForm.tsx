'use client';

import { FamilyInfo } from '@/types/report';
import { useState } from 'react';

interface Props {
  data: FamilyInfo;
  onChange: (data: FamilyInfo) => void;
}

const budgetOptions = [
  '10万以下',
  '10-30万',
  '30-50万',
  '50-100万',
  '100万以上',
  '不设上限'
];

const resourceOptions = [
  '政府/体制内人脉',
  '金融行业资源',
  '互联网行业资源',
  '医疗健康资源',
  '教育行业资源',
  '海外留学资源',
  '企业家/商业资源',
  '媒体传播资源',
  '法律行业资源',
  '房地产资源'
];

export default function FamilyInfoForm({ data, onChange }: Props) {
  const [newResource, setNewResource] = useState('');

  const handleChange = <K extends keyof FamilyInfo>(
    field: K,
    value: FamilyInfo[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const handleDemandChange = (
    field: keyof FamilyInfo['demands'],
    value: string
  ) => {
    onChange({
      ...data,
      demands: { ...data.demands, [field]: value }
    });
  };

  const toggleResource = (resource: string) => {
    if (data.resources.includes(resource)) {
      handleChange('resources', data.resources.filter((r) => r !== resource));
    } else {
      handleChange('resources', [...data.resources, resource]);
    }
  };

  const addCustomResource = () => {
    if (!newResource.trim() || data.resources.includes(newResource.trim())) return;
    handleChange('resources', [...data.resources, newResource.trim()]);
    setNewResource('');
  };

  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 className="form-section-title">
        <span className="inline-flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          家庭信息
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 家庭结构 */}
        <div>
          <label className="form-label">家庭结构 *</label>
          <input
            type="text"
            className="form-input"
            placeholder="如：双亲家庭、单亲家庭、父母+祖父母"
            value={data.structure}
            onChange={(e) => handleChange('structure', e.target.value)}
          />
        </div>

        {/* 父母职业 */}
        <div>
          <label className="form-label">家庭产业/父母职业 *</label>
          <input
            type="text"
            className="form-input"
            placeholder="如：父亲-企业高管，母亲-教师"
            value={data.parentOccupation}
            onChange={(e) => handleChange('parentOccupation', e.target.value)}
          />
        </div>

        {/* 经济预算 */}
        <div className="md:col-span-2">
          <label className="form-label">教育经济预算 *</label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-2">
            {budgetOptions.map((budget) => (
              <button
                key={budget}
                type="button"
                onClick={() => handleChange('budget', budget)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  data.budget === budget
                    ? 'border-primary bg-primary text-white shadow-md'
                    : 'border-gray-200 hover:border-secondary hover:bg-light-bg'
                }`}
              >
                {budget}
              </button>
            ))}
          </div>
        </div>

        {/* 家庭资源 */}
        <div className="md:col-span-2">
          <label className="form-label">家庭资源（可多选）</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
            {resourceOptions.map((resource) => (
              <button
                key={resource}
                type="button"
                onClick={() => toggleResource(resource)}
                className={`p-2 rounded-lg border text-sm transition-all ${
                  data.resources.includes(resource)
                    ? 'border-secondary bg-secondary text-white'
                    : 'border-gray-200 hover:border-secondary hover:bg-light-bg'
                }`}
              >
                {resource}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              className="form-input flex-1"
              placeholder="添加其他资源"
              value={newResource}
              onChange={(e) => setNewResource(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomResource()}
            />
            <button type="button" onClick={addCustomResource} className="btn-secondary">
              添加
            </button>
          </div>
          {data.resources.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {data.resources.map((resource, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-primary rounded-full text-sm"
                >
                  {resource}
                  <button
                    type="button"
                    onClick={() => toggleResource(resource)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 家庭诉求 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-secondary mb-4">家庭诉求</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="form-label">升学目标 *</label>
            <textarea
              className="form-input min-h-[100px]"
              placeholder="如：冲刺985/211，保底一本；或香港/新加坡名校"
              value={data.demands.educationGoal}
              onChange={(e) => handleDemandChange('educationGoal', e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">就业期望 *</label>
            <textarea
              className="form-input min-h-[100px]"
              placeholder="如：进入互联网大厂、金融行业核心岗位"
              value={data.demands.careerExpectation}
              onChange={(e) => handleDemandChange('careerExpectation', e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">地域偏好 *</label>
            <textarea
              className="form-input min-h-[100px]"
              placeholder="如：北京、上海、深圳等一线城市"
              value={data.demands.locationPreference}
              onChange={(e) => handleDemandChange('locationPreference', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

