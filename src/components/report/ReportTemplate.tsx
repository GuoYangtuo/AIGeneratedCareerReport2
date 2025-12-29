'use client';

import { FullReportData, INSTITUTION_INFO, THEME_COLORS } from '@/types/report';
import { format } from 'date-fns';

interface Props {
  data: FullReportData;
}

export default function ReportTemplate({ data }: Props) {
  const { input, generated, generatedAt } = data;
  const formattedDate = format(new Date(generatedAt), 'yyyy年MM月dd日');

  return (
    <div id="report-content" className="report-container">
      {/* 封面页 */}
      <CoverPage 
        studentName={input.studentInfo.name}
        consultant={input.consultantInfo}
        date={formattedDate}
      />

      {/* 背景介绍页 */}
      <BackgroundPage />

      {/* 测评结果及家庭分析页 */}
      <AssessmentPage 
        input={input}
        generated={generated}
      />

      {/* 咨询规划建议页 */}
      <PlanningPage generated={generated} />

      {/* 升学项目建议页 */}
      <ProjectsPage projects={generated.educationProjects} />

      {/* 申请时间表页 */}
      <TimelinePage timeline={generated.timeline} />

      {/* 供应链项目推荐页 */}
      <SupplyChainPage projects={generated.supplyChainProjects} />

      {/* 总结页 */}
      <SummaryPage 
        summary={generated.summary}
        studentName={input.studentInfo.name}
      />

      <style jsx>{`
        .report-container {
          width: 210mm;
          background: white;
          font-family: "Microsoft YaHei", "Source Han Sans", sans-serif;
          color: ${THEME_COLORS.black};
        }
        .page {
          width: 210mm;
          min-height: 297mm;
          padding: 25mm 20mm;
          page-break-after: always;
          position: relative;
          box-sizing: border-box;
        }
        .page:last-child {
          page-break-after: avoid;
        }
        .page-number {
          position: absolute;
          bottom: 15mm;
          left: 50%;
          transform: translateX(-50%);
          color: ${THEME_COLORS.primary};
          font-size: 10pt;
        }
        h1 {
          color: ${THEME_COLORS.primary};
          font-size: 24pt;
          font-weight: bold;
        }
        h2 {
          color: ${THEME_COLORS.primary};
          font-size: 16pt;
          font-weight: bold;
          margin-bottom: 12pt;
          padding-bottom: 6pt;
          border-bottom: 2px solid ${THEME_COLORS.accent};
        }
        h3 {
          color: ${THEME_COLORS.secondary};
          font-size: 12pt;
          font-weight: bold;
          margin-bottom: 8pt;
        }
        .primary-text {
          color: ${THEME_COLORS.primary};
        }
        .secondary-text {
          color: ${THEME_COLORS.secondary};
        }
        .accent-bg {
          background-color: ${THEME_COLORS.accent};
        }
        .light-bg {
          background-color: ${THEME_COLORS.lightBg};
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 12pt 0;
        }
        th {
          background-color: ${THEME_COLORS.primary};
          color: white;
          padding: 10pt;
          text-align: left;
          font-size: 10pt;
        }
        td {
          padding: 8pt 10pt;
          border-bottom: 0.5pt solid ${THEME_COLORS.primary};
          font-size: 9pt;
        }
        tr:nth-child(even) td {
          background-color: ${THEME_COLORS.lightBg};
        }
        .bullet-item {
          padding-left: 20pt;
          position: relative;
          margin-bottom: 6pt;
          font-size: 10pt;
        }
        .bullet-item::before {
          content: "•";
          position: absolute;
          left: 6pt;
          color: ${THEME_COLORS.accent};
          font-weight: bold;
        }
        .highlight {
          color: ${THEME_COLORS.secondary};
          font-weight: bold;
        }
        .card {
          background: white;
          border: 1pt solid ${THEME_COLORS.accent};
          border-radius: 8pt;
          padding: 12pt;
          margin-bottom: 12pt;
        }
        .tag {
          display: inline-block;
          padding: 4pt 10pt;
          background: ${THEME_COLORS.accent};
          color: ${THEME_COLORS.primary};
          border-radius: 12pt;
          font-size: 9pt;
          margin-right: 6pt;
          margin-bottom: 6pt;
        }
      `}</style>
    </div>
  );
}

// 封面页组件
function CoverPage({ studentName, consultant, date }: {
  studentName: string;
  consultant: { name: string; phone: string; wechat: string };
  date: string;
}) {
  return (
    <div className="page" style={{
      background: `linear-gradient(135deg, ${THEME_COLORS.primary} 0%, ${THEME_COLORS.secondary} 50%, ${THEME_COLORS.accent} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white'
    }}>
      {/* Logo区域 */}
      <div style={{ marginBottom: '40pt' }}>
        <div style={{
          width: '80pt',
          height: '80pt',
          background: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20pt'
        }}>
          <span style={{ 
            color: THEME_COLORS.primary, 
            fontSize: '32pt', 
            fontWeight: 'bold' 
          }}>华</span>
        </div>
        <p style={{ fontSize: '11pt', opacity: 0.9 }}>中海皓联教育科技集团</p>
        <p style={{ fontSize: '14pt', fontWeight: 'bold' }}>华芯百科</p>
      </div>

      {/* 报告标题 */}
      <div style={{ marginBottom: '60pt' }}>
        <h1 style={{ 
          color: 'white', 
          fontSize: '32pt', 
          marginBottom: '20pt',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          {studentName}
        </h1>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '15pt 40pt',
          borderRadius: '30pt',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ fontSize: '24pt', fontWeight: 'bold' }}>生涯定制报告</p>
        </div>
      </div>

      {/* 分隔线 */}
      <div style={{
        width: '60%',
        height: '2pt',
        background: `linear-gradient(90deg, transparent, white, transparent)`,
        margin: '30pt 0'
      }} />

      {/* 咨询老师信息 */}
      <div style={{ marginBottom: '30pt' }}>
        <p style={{ fontSize: '11pt', marginBottom: '8pt' }}>专属咨询顾问</p>
        <p style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '8pt' }}>
          {consultant.name} 老师
        </p>
        <p style={{ fontSize: '10pt', opacity: 0.9 }}>
          电话/微信：{consultant.phone}
          {consultant.wechat && consultant.wechat !== consultant.phone && ` / ${consultant.wechat}`}
        </p>
      </div>

      {/* 日期 */}
      <div style={{
        position: 'absolute',
        bottom: '30mm',
        fontSize: '10pt',
        opacity: 0.8
      }}>
        <p>报告生成日期：{date}</p>
      </div>
    </div>
  );
}

// 背景介绍页组件
function BackgroundPage() {
  return (
    <div className="page light-bg">
      <h1 style={{ textAlign: 'center', marginBottom: '30pt' }}>机构介绍</h1>
      
      {/* 机构简介 */}
      <section style={{ marginBottom: '24pt' }}>
        <h2>机构简介</h2>
        <p style={{ fontSize: '10pt', lineHeight: 1.8, textAlign: 'justify' }}>
          中海皓联教育科技集团旗下华芯百科，是一家专注于AI智能教育规划的领先机构。
          我们致力于为初中至本科阶段的学生提供专业、个性化的生涯规划服务，
          帮助每一位学生找到最适合自己的发展道路，实现升学与职业目标的完美匹配。
        </p>
        <div style={{ 
          marginTop: '16pt', 
          padding: '12pt', 
          background: 'white', 
          borderRadius: '8pt',
          borderLeft: `4pt solid ${THEME_COLORS.primary}`
        }}>
          <p style={{ fontSize: '9pt', marginBottom: '6pt' }}>
            <strong>地址：</strong>{INSTITUTION_INFO.address}
          </p>
          <p style={{ fontSize: '9pt', marginBottom: '6pt' }}>
            <strong>电话：</strong>{INSTITUTION_INFO.phone}
          </p>
          <p style={{ fontSize: '9pt', marginBottom: '6pt' }}>
            <strong>传真：</strong>{INSTITUTION_INFO.fax}
          </p>
          <p style={{ fontSize: '9pt' }}>
            <strong>邮箱：</strong>{INSTITUTION_INFO.email}
          </p>
        </div>
      </section>

      {/* 核心服务 */}
      <section style={{ marginBottom: '24pt' }}>
        <h2>核心服务</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '12pt' 
        }}>
          {INSTITUTION_INFO.services.map((service, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '16pt',
              borderRadius: '8pt',
              textAlign: 'center',
              boxShadow: '0 2pt 8pt rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '40pt',
                height: '40pt',
                background: `linear-gradient(135deg, ${THEME_COLORS.primary}, ${THEME_COLORS.secondary})`,
                borderRadius: '50%',
                margin: '0 auto 10pt',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16pt',
                fontWeight: 'bold'
              }}>
                {index + 1}
              </div>
              <p style={{ fontSize: '10pt', fontWeight: 'bold', color: THEME_COLORS.primary }}>
                {service}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 专家团队 */}
      <section>
        <h2>专家团队</h2>
        <p style={{ fontSize: '10pt', marginBottom: '12pt', color: '#666' }}>
          我们汇聚了来自各领域的顶尖专家，为学生提供全方位的专业指导：
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8pt' }}>
          {INSTITUTION_INFO.expertTeam.map((expert, index) => (
            <span key={index} className="tag" style={{
              background: index % 2 === 0 ? THEME_COLORS.accent : THEME_COLORS.lightBg,
              border: `1pt solid ${THEME_COLORS.secondary}`
            }}>
              {expert}
            </span>
          ))}
        </div>
      </section>

      <div className="page-number">2</div>
    </div>
  );
}

// 测评结果页组件
function AssessmentPage({ input, generated }: { 
  input: FullReportData['input']; 
  generated: FullReportData['generated'];
}) {
  return (
    <>
      <div className="page">
        <h1 style={{ textAlign: 'center', marginBottom: '24pt' }}>测评结果及家庭分析</h1>
        
        {/* 性格测评结论 */}
        <section style={{ marginBottom: '24pt' }}>
          <h2>性格测评结论</h2>
          
          {/* 人格核心类型 */}
          <div style={{
            background: `linear-gradient(135deg, ${THEME_COLORS.primary}, ${THEME_COLORS.secondary})`,
            color: 'white',
            padding: '16pt 20pt',
            borderRadius: '8pt',
            marginBottom: '16pt',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '9pt', marginBottom: '6pt', opacity: 0.9 }}>人格核心类型</p>
            <p style={{ fontSize: '18pt', fontWeight: 'bold' }}>
              {generated.personalityAnalysis.coreType}
            </p>
          </div>

          {/* 性格优势 */}
          <div style={{ marginBottom: '16pt' }}>
            <h3>性格优势</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '8pt' 
            }}>
              {generated.personalityAnalysis.strengths.map((strength, index) => (
                <div key={index} style={{
                  padding: '10pt 14pt',
                  background: '#E8F5E9',
                  borderRadius: '6pt',
                  fontSize: '9pt',
                  borderLeft: `3pt solid #4CAF50`
                }}>
                  ✓ {strength}
                </div>
              ))}
            </div>
          </div>

          {/* 性格缺点 */}
          <div style={{ marginBottom: '16pt' }}>
            <h3>性格缺点</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '8pt' 
            }}>
              {generated.personalityAnalysis.weaknesses.map((weakness, index) => (
                <div key={index} style={{
                  padding: '10pt 14pt',
                  background: '#FFF3E0',
                  borderRadius: '6pt',
                  fontSize: '9pt',
                  borderLeft: `3pt solid #FF9800`
                }}>
                  △ {weakness}
                </div>
              ))}
            </div>
          </div>

          {/* 核心特质总结 */}
          <div>
            <h3>核心特质总结</h3>
            {generated.personalityAnalysis.summary.map((item, index) => (
              <p key={index} className="bullet-item">{item}</p>
            ))}
          </div>
        </section>

        <div className="page-number">3</div>
      </div>

      <div className="page">
        {/* 职业适配分析 */}
        <section style={{ marginBottom: '24pt' }}>
          <h2>职业适配分析</h2>
          <p style={{ fontSize: '9pt', color: '#666', marginBottom: '16pt' }}>
            基于人格特质与兴趣倾向，为您推荐以下职业方向：
          </p>
          
          {generated.careerMatches.map((career, index) => (
            <div key={index} className="card" style={{ marginBottom: '16pt' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '12pt' 
              }}>
                <span style={{
                  width: '28pt',
                  height: '28pt',
                  background: THEME_COLORS.primary,
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginRight: '12pt',
                  fontSize: '12pt'
                }}>
                  {index + 1}
                </span>
                <div>
                  <h3 style={{ margin: 0, color: THEME_COLORS.primary }}>
                    {career.direction}
                  </h3>
                  <p style={{ 
                    fontSize: '8pt', 
                    color: THEME_COLORS.secondary,
                    margin: '4pt 0 0'
                  }}>
                    {career.matchReason}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6pt' }}>
                {career.positions.map((position, pIndex) => (
                  <span key={pIndex} style={{
                    padding: '6pt 12pt',
                    background: THEME_COLORS.lightBg,
                    color: THEME_COLORS.secondary,
                    borderRadius: '4pt',
                    fontSize: '9pt',
                    fontWeight: 'bold'
                  }}>
                    {position}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 家庭情况分析 */}
        <section>
          <h2>家庭情况分析</h2>
          <div style={{
            background: THEME_COLORS.lightBg,
            padding: '16pt',
            borderRadius: '8pt'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '12pt' 
            }}>
              <div>
                <p className="bullet-item">
                  <strong>家庭结构：</strong>{input.familyInfo.structure}
                </p>
                <p className="bullet-item">
                  <strong>家庭产业/父母职业：</strong>{input.familyInfo.parentOccupation}
                </p>
                <p className="bullet-item">
                  <strong>经济预算：</strong>{input.familyInfo.budget}
                </p>
              </div>
              <div>
                <p className="bullet-item">
                  <strong>家庭资源：</strong>
                </p>
                <div style={{ paddingLeft: '20pt', marginTop: '6pt' }}>
                  {input.familyInfo.resources.map((resource, index) => (
                    <span key={index} className="tag">{resource}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ 
              marginTop: '16pt', 
              paddingTop: '16pt', 
              borderTop: `1pt dashed ${THEME_COLORS.accent}` 
            }}>
              <h3>家庭诉求</h3>
              <p className="bullet-item">
                <strong>升学目标：</strong>{input.familyInfo.demands.educationGoal}
              </p>
              <p className="bullet-item">
                <strong>就业期望：</strong>{input.familyInfo.demands.careerExpectation}
              </p>
              <p className="bullet-item">
                <strong>地域偏好：</strong>{input.familyInfo.demands.locationPreference}
              </p>
            </div>
          </div>
        </section>

        <div className="page-number">4</div>
      </div>
    </>
  );
}

// 咨询规划建议页组件
function PlanningPage({ generated }: { generated: FullReportData['generated'] }) {
  return (
    <div className="page">
      <h1 style={{ textAlign: 'center', marginBottom: '24pt' }}>咨询规划建议</h1>
      
      {/* 核心发展路径 */}
      <section style={{ marginBottom: '24pt' }}>
        <h2>核心发展路径</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12pt' }}>
          {generated.developmentPaths.map((path, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'stretch',
              background: 'white',
              borderRadius: '8pt',
              overflow: 'hidden',
              boxShadow: '0 2pt 8pt rgba(0,0,0,0.08)'
            }}>
              <div style={{
                width: '40pt',
                background: `linear-gradient(180deg, ${THEME_COLORS.primary}, ${THEME_COLORS.secondary})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16pt'
              }}>
                {index + 1}
              </div>
              <div style={{ flex: 1, padding: '12pt 16pt' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '12pt',
                  fontSize: '9pt'
                }}>
                  <div>
                    <p style={{ color: '#999', marginBottom: '4pt' }}>升学方向</p>
                    <p style={{ fontWeight: 'bold', color: THEME_COLORS.primary }}>
                      {path.educationDirection}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: '#999', marginBottom: '4pt' }}>职业目标</p>
                    <p style={{ fontWeight: 'bold', color: THEME_COLORS.secondary }}>
                      {path.careerGoal}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: '#999', marginBottom: '4pt' }}>资源适配</p>
                    <p style={{ fontWeight: 'bold' }}>{path.resourceMatch}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 职业规划建议 */}
      <section style={{ marginBottom: '24pt' }}>
        <h2>职业规划建议</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>就业领域</th>
              <th style={{ width: '37.5%' }}>短期发展路径</th>
              <th style={{ width: '37.5%' }}>长期发展路径</th>
            </tr>
          </thead>
          <tbody>
            {generated.careerAdvice.map((advice, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 'bold', color: THEME_COLORS.primary }}>
                  {advice.field}
                </td>
                <td>{advice.shortTermPath}</td>
                <td>{advice.longTermPath}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 家庭配合建议 */}
      <section>
        <h2>家庭配合建议</h2>
        <div style={{
          background: THEME_COLORS.lightBg,
          padding: '16pt',
          borderRadius: '8pt'
        }}>
          {generated.familyCooperationAdvice.map((advice, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12pt',
              marginBottom: index < generated.familyCooperationAdvice.length - 1 ? '12pt' : 0
            }}>
              <span style={{
                width: '24pt',
                height: '24pt',
                background: THEME_COLORS.secondary,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10pt',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {index + 1}
              </span>
              <p style={{ fontSize: '10pt', lineHeight: 1.6 }}>{advice}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="page-number">5</div>
    </div>
  );
}

// 升学项目建议页组件
function ProjectsPage({ projects }: { projects: FullReportData['generated']['educationProjects'] }) {
  const categories = ['升学类', '背景提升类', '兜底类'] as const;
  
  return (
    <>
      <div className="page">
        <h1 style={{ textAlign: 'center', marginBottom: '24pt' }}>升学项目建议</h1>
        
        <section style={{ marginBottom: '16pt' }}>
          <h2>项目推荐列表</h2>
          <table>
            <thead>
              <tr>
                <th style={{ width: '18%' }}>项目名称</th>
                <th style={{ width: '12%' }}>学费范围</th>
                <th style={{ width: '22%' }}>优势</th>
                <th style={{ width: '22%' }}>劣势</th>
                <th style={{ width: '10%' }}>推荐指数</th>
                <th style={{ width: '16%' }}>咨询费</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 'bold' }}>{project.name}</td>
                  <td>{project.tuitionRange}</td>
                  <td>
                    {project.advantages.map((adv, i) => (
                      <span key={i} style={{ display: 'block', fontSize: '8pt' }}>• {adv}</span>
                    ))}
                  </td>
                  <td>
                    {project.disadvantages.map((dis, i) => (
                      <span key={i} style={{ display: 'block', fontSize: '8pt' }}>• {dis}</span>
                    ))}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      color: THEME_COLORS.secondary,
                      fontWeight: 'bold',
                      fontSize: '12pt'
                    }}>
                      {'★'.repeat(project.recommendIndex)}
                      {'☆'.repeat(5 - project.recommendIndex)}
                    </span>
                  </td>
                  <td>{project.consultingFeeRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="page-number">6</div>
      </div>

      <div className="page">
        <h2>项目详解</h2>
        
        {categories.map((category) => {
          const categoryProjects = projects.filter(p => p.category === category);
          if (categoryProjects.length === 0) return null;
          
          return (
            <div key={category} style={{ marginBottom: '20pt' }}>
              <h3 style={{
                background: THEME_COLORS.accent,
                padding: '8pt 12pt',
                borderRadius: '4pt',
                marginBottom: '12pt'
              }}>
                {category}
              </h3>
              
              {categoryProjects.map((project, index) => (
                <div key={index} className="card" style={{ fontSize: '9pt' }}>
                  <h4 style={{ 
                    color: THEME_COLORS.primary, 
                    marginBottom: '10pt',
                    fontSize: '11pt'
                  }}>
                    {project.name}
                  </h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '8pt' 
                  }}>
                    {project.principle && (
                      <div>
                        <p style={{ color: '#999', marginBottom: '2pt' }}>项目原理</p>
                        <p>{project.principle}</p>
                      </div>
                    )}
                    {project.requirements && (
                      <div>
                        <p style={{ color: '#999', marginBottom: '2pt' }}>录取要求</p>
                        <p style={{ color: THEME_COLORS.secondary, fontWeight: 'bold' }}>
                          {project.requirements}
                        </p>
                      </div>
                    )}
                    {project.timeline && (
                      <div>
                        <p style={{ color: '#999', marginBottom: '2pt' }}>时间节点</p>
                        <p style={{ color: THEME_COLORS.secondary, fontWeight: 'bold' }}>
                          {project.timeline}
                        </p>
                      </div>
                    )}
                    {project.process && (
                      <div>
                        <p style={{ color: '#999', marginBottom: '2pt' }}>申请流程</p>
                        <p>{project.process}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        <div className="page-number">7</div>
      </div>
    </>
  );
}

// 申请时间表页组件
function TimelinePage({ timeline }: { timeline: FullReportData['generated']['timeline'] }) {
  return (
    <div className="page">
      <h1 style={{ textAlign: 'center', marginBottom: '24pt' }}>申请时间表</h1>
      
      <table>
        <thead>
          <tr style={{ background: THEME_COLORS.secondary }}>
            <th style={{ width: '15%' }}>阶段</th>
            <th style={{ width: '15%' }}>时间</th>
            <th style={{ width: '45%' }}>核心任务</th>
            <th style={{ width: '25%' }}>注意事项</th>
          </tr>
        </thead>
        <tbody>
          {timeline.map((item, index) => (
            <tr key={index}>
              <td style={{ 
                fontWeight: 'bold', 
                color: THEME_COLORS.primary,
                fontSize: '9pt'
              }}>
                {item.stage}
              </td>
              <td style={{ fontSize: '9pt' }}>{item.time}</td>
              <td style={{ fontSize: '8pt' }}>
                {item.tasks.map((task, tIndex) => (
                  <div key={tIndex} style={{
                    display: 'inline-block',
                    background: tIndex % 2 === 0 ? THEME_COLORS.lightBg : 'white',
                    padding: '4pt 8pt',
                    borderRadius: '4pt',
                    margin: '2pt',
                    border: `1pt solid ${THEME_COLORS.accent}`
                  }}>
                    {task}
                  </div>
                ))}
              </td>
              <td style={{ fontSize: '8pt', color: '#666' }}>{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="page-number">8</div>
    </div>
  );
}

// 供应链项目推荐页组件
function SupplyChainPage({ projects }: { projects: FullReportData['generated']['supplyChainProjects'] }) {
  const categories = ['语言培训', '游学研学', '实习项目', '科研/赛事'] as const;
  
  return (
    <div className="page">
      <h1 style={{ textAlign: 'center', marginBottom: '24pt' }}>供应链项目推荐</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '16pt' 
      }}>
        {categories.map((category) => {
          const categoryProjects = projects.filter(p => p.category === category);
          
          return (
            <div key={category} style={{
              background: THEME_COLORS.lightBg,
              borderRadius: '8pt',
              padding: '16pt',
              border: `1pt solid ${THEME_COLORS.accent}`
            }}>
              <h3 style={{
                color: THEME_COLORS.primary,
                marginBottom: '12pt',
                paddingBottom: '8pt',
                borderBottom: `2pt solid ${THEME_COLORS.primary}`
              }}>
                {category}
              </h3>
              
              {categoryProjects.map((project, index) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '10pt',
                  borderRadius: '6pt',
                  marginBottom: '8pt'
                }}>
                  <p style={{
                    fontWeight: 'bold',
                    color: THEME_COLORS.secondary,
                    fontSize: '10pt',
                    marginBottom: '4pt'
                  }}>
                    {project.name}
                  </p>
                  <p style={{ fontSize: '8pt', color: '#666', marginBottom: '4pt' }}>
                    {project.description}
                  </p>
                  <p style={{
                    fontSize: '8pt',
                    color: THEME_COLORS.primary,
                    fontWeight: 'bold'
                  }}>
                    ✓ {project.advantage}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="page-number">9</div>
    </div>
  );
}

// 总结页组件
function SummaryPage({ summary, studentName }: { 
  summary: FullReportData['generated']['summary'];
  studentName: string;
}) {
  return (
    <div className="page">
      <h1 style={{ textAlign: 'center', marginBottom: '24pt' }}>规划总结与行动建议</h1>
      
      {/* 规划逻辑 */}
      <section style={{ marginBottom: '20pt' }}>
        <h2>整体规划逻辑</h2>
        <div style={{
          background: `linear-gradient(135deg, ${THEME_COLORS.lightBg}, white)`,
          padding: '16pt',
          borderRadius: '8pt',
          borderLeft: `4pt solid ${THEME_COLORS.primary}`
        }}>
          <p style={{ fontSize: '10pt', lineHeight: 1.8 }}>{summary.planningLogic}</p>
        </div>
      </section>

      {/* 核心竞争力 */}
      <section style={{ marginBottom: '20pt' }}>
        <h2>学生核心竞争力</h2>
        <div style={{
          background: `linear-gradient(135deg, ${THEME_COLORS.primary}, ${THEME_COLORS.secondary})`,
          color: 'white',
          padding: '20pt',
          borderRadius: '8pt',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '11pt', lineHeight: 1.8 }}>{summary.coreCompetence}</p>
        </div>
      </section>

      {/* 行动建议 */}
      <section style={{ marginBottom: '20pt' }}>
        <h2>后续行动建议</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10pt' }}>
          {summary.actionSuggestions.map((suggestion, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12pt',
              padding: '12pt 16pt',
              background: 'white',
              borderRadius: '6pt',
              boxShadow: '0 2pt 8pt rgba(0,0,0,0.08)'
            }}>
              <span style={{
                width: '28pt',
                height: '28pt',
                background: THEME_COLORS.secondary,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '11pt',
                flexShrink: 0
              }}>
                {index + 1}
              </span>
              <p style={{ fontSize: '10pt' }}>{suggestion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 服务承诺 */}
      <section style={{ marginBottom: '20pt' }}>
        <h2>机构服务承诺</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10pt' }}>
          {summary.serviceCommitment.map((commitment, index) => (
            <div key={index} style={{
              padding: '10pt 16pt',
              background: THEME_COLORS.accent,
              color: THEME_COLORS.primary,
              borderRadius: '20pt',
              fontSize: '9pt',
              fontWeight: 'bold'
            }}>
              ✓ {commitment}
            </div>
          ))}
        </div>
      </section>

      {/* 鼓励语 */}
      <div style={{
        marginTop: '30pt',
        padding: '20pt',
        background: THEME_COLORS.lightBg,
        borderRadius: '8pt',
        textAlign: 'center'
      }}>
        <p style={{ 
          fontSize: '14pt', 
          color: THEME_COLORS.primary, 
          fontWeight: 'bold',
          marginBottom: '8pt'
        }}>
          亲爱的{studentName}同学
        </p>
        <p style={{ fontSize: '10pt', color: '#666', lineHeight: 1.8 }}>
          每一个梦想都值得被认真对待，每一份努力都将开花结果。<br />
          华芯百科将陪伴你的每一步成长，助你成就精彩人生！
        </p>
      </div>

      <div className="page-number">10</div>
    </div>
  );
}

