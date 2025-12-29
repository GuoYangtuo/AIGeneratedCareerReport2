// 学生生涯报告数据类型定义

// 学生基础信息
export interface StudentInfo {
  name: string;
  grade: '初一' | '初二' | '初三' | '高一' | '高二' | '高三' | '大一' | '大二' | '大三' | '大四';
  currentPerformance: '优秀' | '中等' | '待提升';
  targetDegree: '本科' | '硕士' | '博士';
  school?: string;
  major?: string;
}

// 测评数据
export interface AssessmentData {
  personalityType: string; // 人格核心类型，如"战略规划型"、"务实行动型"
  personalityTraits: {
    strengths: string[]; // 性格优势，至少3点
    weaknesses: string[]; // 性格缺点，至少3点
  };
  thinkingPatterns: string[]; // 思维模式/行为特点，至少3句
  interestTendency: string[]; // 兴趣倾向
  subjectStrengths: string[]; // 学科优势，至少2科
}

// 职业适配信息
export interface CareerMatch {
  direction: string; // 职业方向
  positions: string[]; // 具体岗位，3-5个
  matchReason: string; // 适配原因，不超过20字
}

// 家庭信息
export interface FamilyInfo {
  structure: string; // 家庭结构
  parentOccupation: string; // 家庭产业/父母职业
  budget: string; // 经济预算
  resources: string[]; // 家庭资源（人脉/政策/经济支持等）
  demands: {
    educationGoal: string; // 升学目标
    careerExpectation: string; // 就业期望
    locationPreference: string; // 地域偏好
  };
}

// 特殊情况
export interface SpecialCircumstances {
  hasAcademicIssues: boolean; // 是否有考学问题
  academicIssuesDetail?: string; // 偏科/成绩波动等详情
  hasSpecialPlanning: boolean; // 是否有特色规划
  specialPlanningDetail?: string; // 艺术/体育特长等详情
  lacksResources: boolean; // 是否缺乏资源
  lacksResourcesDetail?: string; // 竞赛/实习/科研等详情
}

// 咨询老师信息
export interface ConsultantInfo {
  name: string;
  phone: string;
  wechat: string;
}

// 升学项目
export interface EducationProject {
  name: string;
  tuitionRange: string;
  advantages: string[];
  disadvantages: string[];
  recommendIndex: number; // 1-5分
  consultingFeeRange: string;
  category: '升学类' | '背景提升类' | '兜底类';
  principle?: string; // 项目原理
  requirements?: string; // 录取要求
  timeline?: string; // 时间节点
  process?: string; // 流程
}

// 时间规划
export interface TimelineItem {
  stage: string; // 阶段
  time: string; // 时间
  tasks: string[]; // 核心任务
  notes: string; // 注意事项
}

// 供应链项目
export interface SupplyChainProject {
  category: '语言培训' | '游学研学' | '实习项目' | '科研/赛事';
  name: string;
  description: string;
  advantage: string;
}

// 职业规划建议
export interface CareerPlanningAdvice {
  field: string; // 就业领域
  shortTermPath: string; // 短期发展路径
  longTermPath: string; // 长期发展路径
}

// 发展路径
export interface DevelopmentPath {
  educationDirection: string; // 升学方向
  careerGoal: string; // 职业目标
  resourceMatch: string; // 资源适配
}

// 完整的报告输入数据
export interface ReportInputData {
  studentInfo: StudentInfo;
  assessmentData: AssessmentData;
  familyInfo: FamilyInfo;
  specialCircumstances: SpecialCircumstances;
  consultantInfo: ConsultantInfo;
}

// AI 生成的报告内容
export interface GeneratedReportContent {
  // 测评结果分析
  personalityAnalysis: {
    coreType: string;
    strengths: string[];
    weaknesses: string[];
    summary: string[];
  };
  
  // 职业适配分析
  careerMatches: CareerMatch[];
  
  // 咨询规划建议
  developmentPaths: DevelopmentPath[];
  careerAdvice: CareerPlanningAdvice[];
  familyCooperationAdvice: string[];
  
  // 升学项目建议
  educationProjects: EducationProject[];
  
  // 申请时间表
  timeline: TimelineItem[];
  
  // 供应链项目推荐
  supplyChainProjects: SupplyChainProject[];
  
  // 总结
  summary: {
    planningLogic: string;
    coreCompetence: string;
    actionSuggestions: string[];
    serviceCommitment: string[];
  };
}

// 完整报告数据
export interface FullReportData {
  input: ReportInputData;
  generated: GeneratedReportContent;
  generatedAt: string;
}

// 机构信息（固定）
export const INSTITUTION_INFO = {
  name: '中海皓联教育科技集团 - 华芯百科',
  address: '上海市静安区万荣路700号A2栋',
  phone: '021-52729115',
  fax: '021-66392688',
  email: 'contact@huaxinbaike.com',
  services: [
    'AI智能规划',
    '升学辅导',
    '职业规划',
    '资源对接',
    '背景提升',
    '留学申请'
  ],
  expertTeam: [
    '顶尖大学教授团队',
    '世界500强企业高管',
    '资深HR面试官',
    '海外教育专家',
    '行业领军人物'
  ]
};

// 颜色主题
export const THEME_COLORS = {
  primary: '#B04047',      // 主色
  secondary: '#CC6471',    // 辅助色
  accent: '#D3A5A9',       // 点缀色
  white: '#FFFFFF',
  black: '#333333',
  lightBg: '#FDF5F5'       // 浅背景色
};

