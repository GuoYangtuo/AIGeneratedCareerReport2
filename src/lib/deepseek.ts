// DeepSeek API 集成服务
import OpenAI from 'openai';
import type { 
  ReportInputData, 
  GeneratedReportContent,
  CareerMatch,
  EducationProject,
  TimelineItem,
  SupplyChainProject,
  CareerPlanningAdvice,
  DevelopmentPath
} from '@/types/report';

// 创建 DeepSeek 客户端（使用 OpenAI 兼容接口）
const createDeepSeekClient = (apiKey: string) => {
  return new OpenAI({
    baseURL: 'https://api.deepseek.com/v1',
    apiKey: apiKey,
  });
};

// 生成报告内容的主函数
export async function generateReportContent(
  input: ReportInputData,
  apiKey: string
): Promise<GeneratedReportContent> {
  const client = createDeepSeekClient(apiKey);

  // 分模块并行生成内容
  const [
    personalityAnalysis,
    careerMatches,
    planningAdvice,
    educationProjects,
    timeline,
    supplyChainProjects,
    summary
  ] = await Promise.all([
    generatePersonalityAnalysis(client, input),
    generateCareerMatches(client, input),
    generatePlanningAdvice(client, input),
    generateEducationProjects(client, input),
    generateTimeline(client, input),
    generateSupplyChainProjects(client, input),
    generateSummary(client, input)
  ]);

  return {
    personalityAnalysis,
    careerMatches,
    developmentPaths: planningAdvice.developmentPaths,
    careerAdvice: planningAdvice.careerAdvice,
    familyCooperationAdvice: planningAdvice.familyCooperationAdvice,
    educationProjects,
    timeline,
    supplyChainProjects,
    summary
  };
}

// 生成性格分析
async function generatePersonalityAnalysis(
  client: OpenAI,
  input: ReportInputData
): Promise<GeneratedReportContent['personalityAnalysis']> {
  const prompt = `
你是一位专业的生涯规划顾问，请基于以下学生信息生成详细的性格测评分析：

学生信息：
- 姓名：${input.studentInfo.name}
- 年级：${input.studentInfo.grade}
- 成绩水平：${input.studentInfo.currentPerformance}
- 人格类型：${input.assessmentData.personalityType}
- 兴趣倾向：${input.assessmentData.interestTendency.join('、')}
- 学科优势：${input.assessmentData.subjectStrengths.join('、')}

已有的性格特质：
优势：${input.assessmentData.personalityTraits.strengths.join('、')}
劣势：${input.assessmentData.personalityTraits.weaknesses.join('、')}

请生成JSON格式的性格分析报告：
{
  "coreType": "人格核心类型的详细描述（如：战略规划型 - 具有卓越的逻辑分析能力和长远眼光）",
  "strengths": ["性格优势1（具体描述，避免空泛）", "性格优势2", "性格优势3", "性格优势4"],
  "weaknesses": ["性格缺点1（具体描述）", "性格缺点2", "性格缺点3"],
  "summary": ["思维模式描述1", "行为特点描述2", "核心特质总结3"]
}

要求：
1. 优势和劣势各至少3点，内容具体，避免"性格开朗"等空泛表述
2. 思维模式/行为特点至少3句话
3. 贴合${input.assessmentData.personalityType}人格类型的特征
4. 只返回JSON，不要其他内容
`;

  const response = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content || '{}';
  return JSON.parse(content);
}

// 生成职业适配分析
async function generateCareerMatches(
  client: OpenAI,
  input: ReportInputData
): Promise<CareerMatch[]> {
  const prompt = `
你是一位专业的职业规划顾问，请基于以下学生信息生成职业适配分析：

学生信息：
- 人格类型：${input.assessmentData.personalityType}
- 性格优势：${input.assessmentData.personalityTraits.strengths.join('、')}
- 兴趣倾向：${input.assessmentData.interestTendency.join('、')}
- 学科优势：${input.assessmentData.subjectStrengths.join('、')}
- 目标学历：${input.studentInfo.targetDegree}
- 家庭就业期望：${input.familyInfo.demands.careerExpectation}
- 地域偏好：${input.familyInfo.demands.locationPreference}

请推荐3类核心职业方向，每类3-5个具体岗位，返回JSON数组：
[
  {
    "direction": "职业方向1（如：金融投资领域）",
    "positions": ["岗位1", "岗位2", "岗位3", "岗位4"],
    "matchReason": "适配原因（不超过20字）"
  },
  {
    "direction": "职业方向2",
    "positions": ["岗位1", "岗位2", "岗位3"],
    "matchReason": "适配原因"
  },
  {
    "direction": "职业方向3",
    "positions": ["岗位1", "岗位2", "岗位3"],
    "matchReason": "适配原因"
  }
]

要求：
1. 职业方向要具体且与人格特质匹配
2. 岗位要具体可落地（如：金融分析师、产品经理、数据科学家等）
3. 适配原因简洁有力，不超过20字
4. 只返回JSON数组，不要其他内容
`;

  const response = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content || '[]';
  const parsed = JSON.parse(content);
  return Array.isArray(parsed) ? parsed : parsed.careers || parsed.data || [];
}

// 生成规划建议
async function generatePlanningAdvice(
  client: OpenAI,
  input: ReportInputData
): Promise<{
  developmentPaths: DevelopmentPath[];
  careerAdvice: CareerPlanningAdvice[];
  familyCooperationAdvice: string[];
}> {
  const prompt = `
你是一位专业的生涯规划顾问，请基于以下学生和家庭信息生成咨询规划建议：

学生信息：
- 姓名：${input.studentInfo.name}
- 年级：${input.studentInfo.grade}
- 成绩水平：${input.studentInfo.currentPerformance}
- 目标学历：${input.studentInfo.targetDegree}
- 人格类型：${input.assessmentData.personalityType}

家庭信息：
- 家庭结构：${input.familyInfo.structure}
- 父母职业：${input.familyInfo.parentOccupation}
- 经济预算：${input.familyInfo.budget}
- 家庭资源：${input.familyInfo.resources.join('、')}
- 升学目标：${input.familyInfo.demands.educationGoal}
- 就业期望：${input.familyInfo.demands.careerExpectation}
- 地域偏好：${input.familyInfo.demands.locationPreference}

特殊情况：
- 考学问题：${input.specialCircumstances.hasAcademicIssues ? input.specialCircumstances.academicIssuesDetail : '无'}
- 特色规划：${input.specialCircumstances.hasSpecialPlanning ? input.specialCircumstances.specialPlanningDetail : '无'}
- 资源缺乏：${input.specialCircumstances.lacksResources ? input.specialCircumstances.lacksResourcesDetail : '无'}

请生成JSON格式的规划建议：
{
  "developmentPaths": [
    {
      "educationDirection": "升学方向（如：冲刺985/211院校计算机专业）",
      "careerGoal": "职业目标（如：互联网大厂产品经理）",
      "resourceMatch": "资源适配（如：利用家庭金融行业人脉进行背景提升）"
    },
    {"educationDirection": "...", "careerGoal": "...", "resourceMatch": "..."},
    {"educationDirection": "...", "careerGoal": "...", "resourceMatch": "..."}
  ],
  "careerAdvice": [
    {
      "field": "就业领域1（如：互联网科技）",
      "shortTermPath": "短期路径（1-2句）",
      "longTermPath": "长期路径（1-2句）"
    },
    {"field": "...", "shortTermPath": "...", "longTermPath": "..."},
    {"field": "...", "shortTermPath": "...", "longTermPath": "..."}
  ],
  "familyCooperationAdvice": [
    "家庭需调整/强化的方向1（具体可落地）",
    "家庭需调整/强化的方向2"
  ]
}

要求：
1. 发展路径3条，逻辑清晰，升学-职业-资源三者关联
2. 职业建议3个领域，短期和长期路径具体可落地
3. 家庭配合建议1-2条，具体可落地
4. 只返回JSON，不要其他内容
`;

  const response = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content || '{}';
  return JSON.parse(content);
}

// 生成升学项目建议
async function generateEducationProjects(
  client: OpenAI,
  input: ReportInputData
): Promise<EducationProject[]> {
  const prompt = `
你是一位专业的升学规划顾问，请基于以下学生信息推荐升学项目：

学生信息：
- 年级：${input.studentInfo.grade}
- 成绩水平：${input.studentInfo.currentPerformance}
- 目标学历：${input.studentInfo.targetDegree}
- 经济预算：${input.familyInfo.budget}
- 升学目标：${input.familyInfo.demands.educationGoal}
- 地域偏好：${input.familyInfo.demands.locationPreference}

请推荐6-8个升学项目，覆盖以下3类：
1. 升学类（国内提分营/中外合作办学/留学项目）- 推荐2-3个
2. 背景提升类（名企实习/科研项目）- 推荐2-3个
3. 兜底类（成人本科/专科+硕士）- 推荐2个

返回JSON数组：
[
  {
    "name": "项目名称（如：香港副学士转学士项目）",
    "tuitionRange": "学费范围（如：15-25万/年）",
    "advantages": ["优势1", "优势2"],
    "disadvantages": ["劣势1", "劣势2"],
    "recommendIndex": 4,
    "consultingFeeRange": "咨询费范围（如：3-5万）",
    "category": "升学类",
    "principle": "项目原理（学习模式/培养目标）",
    "requirements": "录取要求（学历/语言/成绩等）",
    "timeline": "时间节点（报名/入学/毕业关键时间）",
    "process": "流程（报名-审核-录取-入学）"
  }
]

项目参考：
- 升学类：香港副学士、3+1国际本科、新加坡公立大学、澳洲八大预科、985强基计划
- 背景提升：四大会计师事务所实习、互联网大厂实习、名校教授科研项目
- 兜底类：成人本科、国内专升本、国外专升硕

要求：
1. 每个项目信息完整，包含所有字段
2. 推荐指数1-5分，根据学生情况给出合理评分
3. 项目需真实存在，信息准确
4. 根据学生预算和目标合理推荐
5. 只返回JSON数组，不要其他内容
`;

  const response = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content || '[]';
  const parsed = JSON.parse(content);
  return Array.isArray(parsed) ? parsed : parsed.projects || parsed.data || [];
}

// 生成申请时间表
async function generateTimeline(
  client: OpenAI,
  input: ReportInputData
): Promise<TimelineItem[]> {
  const gradeTimelines: Record<string, string> = {
    '初一': '初中三年+高中三年规划',
    '初二': '初中剩余时间+高中三年规划',
    '初三': '中考冲刺+高中三年规划',
    '高一': '高中三年+大学四年规划',
    '高二': '高中剩余时间+大学四年规划',
    '高三': '高考冲刺+大学四年规划',
    '大一': '大学四年规划',
    '大二': '大学剩余时间规划',
    '大三': '大学剩余时间+研究生规划',
    '大四': '毕业求职/研究生申请规划'
  };

  const prompt = `
你是一位专业的升学规划顾问，请为以下学生制定详细的申请时间表：

学生信息：
- 年级：${input.studentInfo.grade}
- 目标学历：${input.studentInfo.targetDegree}
- 升学目标：${input.familyInfo.demands.educationGoal}
- 规划范围：${gradeTimelines[input.studentInfo.grade]}

请按阶段生成时间规划，返回JSON数组：
[
  {
    "stage": "阶段名称（如：高一上学期）",
    "time": "具体时间（如：9月-次年1月）",
    "tasks": ["核心任务1", "核心任务2", "核心任务3"],
    "notes": "注意事项"
  }
]

要求：
1. 覆盖从当前年级到目标学历的完整规划
2. 每个阶段包含3-5个核心任务
3. 任务具体可执行（如：完成60学时志愿者服务、报名雅思考试）
4. 注意事项要具体有用
5. 至少包含8-12个阶段
6. 只返回JSON数组，不要其他内容
`;

  const response = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content || '[]';
  const parsed = JSON.parse(content);
  return Array.isArray(parsed) ? parsed : parsed.timeline || parsed.data || [];
}

// 生成供应链项目推荐
async function generateSupplyChainProjects(
  client: OpenAI,
  input: ReportInputData
): Promise<SupplyChainProject[]> {
  const prompt = `
你是一位专业的教育资源顾问，请为以下学生推荐供应链项目：

学生信息：
- 年级：${input.studentInfo.grade}
- 目标学历：${input.studentInfo.targetDegree}
- 兴趣倾向：${input.assessmentData.interestTendency.join('、')}
- 就业期望：${input.familyInfo.demands.careerExpectation}

请推荐以下4类项目，每类2-3个，返回JSON数组：
[
  {
    "category": "语言培训",
    "name": "项目名称（如：雅思1v1保分班）",
    "description": "项目描述",
    "advantage": "服务优势（不超过20字）"
  }
]

项目类别要求：
1. 语言培训：雅思/托福1v1辅导、多邻国培训、小语种培训等
2. 游学研学：剑桥/牛津暑期营、清北复交研学营、文化体验营等
3. 实习项目：四大会计师事务所、腾讯/阿里/字节等互联网大厂、中金/中信等金融机构
4. 科研/赛事：白名单赛事辅导、名校教授1v1科研、论文发表辅导等

要求：
1. 每类2-3个项目，共8-12个
2. 项目名称具体真实
3. 服务优势简洁有力，不超过20字
4. 只返回JSON数组，不要其他内容
`;

  const response = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content || '[]';
  const parsed = JSON.parse(content);
  return Array.isArray(parsed) ? parsed : parsed.projects || parsed.data || [];
}

// 生成总结
async function generateSummary(
  client: OpenAI,
  input: ReportInputData
): Promise<GeneratedReportContent['summary']> {
  const prompt = `
你是一位专业的生涯规划顾问，请为以下学生生成报告总结：

学生信息：
- 姓名：${input.studentInfo.name}
- 年级：${input.studentInfo.grade}
- 人格类型：${input.assessmentData.personalityType}
- 目标学历：${input.studentInfo.targetDegree}
- 升学目标：${input.familyInfo.demands.educationGoal}
- 就业期望：${input.familyInfo.demands.careerExpectation}

请生成JSON格式的总结：
{
  "planningLogic": "整体规划逻辑（测评-适配-项目-执行的完整逻辑，3-4句话）",
  "coreCompetence": "学生核心竞争力提炼（2-3句话，突出个人优势）",
  "actionSuggestions": [
    "后续行动建议1（具体可执行）",
    "后续行动建议2",
    "后续行动建议3",
    "后续行动建议4"
  ],
  "serviceCommitment": [
    "机构服务承诺1（如：一站式资源对接）",
    "机构服务承诺2（如：全程跟踪辅导）",
    "机构服务承诺3"
  ]
}

要求：
1. 规划逻辑清晰，体现专业性
2. 核心竞争力贴合学生个人情况
3. 行动建议至少3条，具体可落地
4. 结尾需有鼓励性表述
5. 只返回JSON，不要其他内容
`;

  const response = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content || '{}';
  return JSON.parse(content);
}

export default generateReportContent;

