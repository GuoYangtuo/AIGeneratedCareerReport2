import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import type { FullReportData } from '@/types/report';
import { format } from 'date-fns';

export async function POST(request: NextRequest) {
  let browser;
  try {
    const body = await request.json();
    const { reportData } = body as { reportData: FullReportData };

    if (!reportData) {
      return NextResponse.json(
        { error: '请提供报告数据' },
        { status: 400 }
      );
    }

    // 生成 HTML 内容
    const htmlContent = generateReportHTML(reportData);

    // 启动 Puppeteer - 优先使用系统安装的 Chrome
    const executablePath = process.env.CHROME_PATH || 
      (process.platform === 'linux' ? '/usr/bin/google-chrome-stable' : undefined);
    
    browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
    
    // 设置页面内容
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });

    // 生成 PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      }
    });

    await browser.close();

    // 生成文件名
    const dateStr = format(new Date(), 'yyyyMMdd');
    const fileName = `${reportData.input.studentInfo.name}-${reportData.input.studentInfo.grade}-生涯定制报告-${dateStr}.pdf`;

    // 返回 PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`
      }
    });
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    console.error('生成 PDF 失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '生成 PDF 失败，请重试' },
      { status: 500 }
    );
  }
}

function generateReportHTML(data: FullReportData): string {
  const { input, generated, generatedAt } = data;
  const formattedDate = format(new Date(generatedAt), 'yyyy年MM月dd日');
  
  const COLORS = {
    primary: '#B04047',
    secondary: '#CC6471',
    accent: '#D3A5A9',
    lightBg: '#FDF5F5',
    black: '#333333'
  };

  const INSTITUTION_INFO = {
    name: '中海皓联教育科技集团 - 华芯百科',
    address: '上海市静安区万荣路700号A2栋',
    phone: '021-52729115',
    fax: '021-66392688',
    email: 'contact@huaxinbaike.com',
    services: ['AI智能规划', '升学辅导', '职业规划', '资源对接', '背景提升', '留学申请'],
    expertTeam: ['顶尖大学教授团队', '世界500强企业高管', '资深HR面试官', '海外教育专家', '行业领军人物']
  };

  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${input.studentInfo.name} - 生涯定制报告</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: "Microsoft YaHei", "Source Han Sans", "SimHei", sans-serif;
      color: ${COLORS.black};
      font-size: 10pt;
      line-height: 1.5;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      page-break-after: always;
      position: relative;
      background: white;
    }
    .page:last-child {
      page-break-after: avoid;
    }
    .page-number {
      position: absolute;
      bottom: 10mm;
      left: 50%;
      transform: translateX(-50%);
      color: ${COLORS.primary};
      font-size: 9pt;
    }
    h1 {
      color: ${COLORS.primary};
      font-size: 22pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20pt;
    }
    h2 {
      color: ${COLORS.primary};
      font-size: 14pt;
      font-weight: bold;
      margin-bottom: 10pt;
      padding-bottom: 6pt;
      border-bottom: 2px solid ${COLORS.accent};
    }
    h3 {
      color: ${COLORS.secondary};
      font-size: 11pt;
      font-weight: bold;
      margin-bottom: 8pt;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10pt 0;
      font-size: 9pt;
    }
    th {
      background-color: ${COLORS.primary};
      color: white;
      padding: 8pt;
      text-align: left;
    }
    td {
      padding: 6pt 8pt;
      border-bottom: 0.5pt solid ${COLORS.accent};
    }
    tr:nth-child(even) td {
      background-color: ${COLORS.lightBg};
    }
    .card {
      background: white;
      border: 1pt solid ${COLORS.accent};
      border-radius: 6pt;
      padding: 12pt;
      margin-bottom: 10pt;
    }
    .tag {
      display: inline-block;
      padding: 3pt 8pt;
      background: ${COLORS.accent};
      color: ${COLORS.primary};
      border-radius: 10pt;
      font-size: 8pt;
      margin: 2pt;
    }
    .bullet-item {
      padding-left: 16pt;
      position: relative;
      margin-bottom: 5pt;
    }
    .bullet-item::before {
      content: "•";
      position: absolute;
      left: 5pt;
      color: ${COLORS.accent};
    }
    .section {
      margin-bottom: 16pt;
    }
    .flex-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8pt;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10pt;
    }
    .strength-item {
      padding: 8pt 10pt;
      background: #E8F5E9;
      border-radius: 4pt;
      border-left: 3pt solid #4CAF50;
      font-size: 9pt;
    }
    .weakness-item {
      padding: 8pt 10pt;
      background: #FFF3E0;
      border-radius: 4pt;
      border-left: 3pt solid #FF9800;
      font-size: 9pt;
    }
    .highlight-box {
      background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary});
      color: white;
      padding: 14pt;
      border-radius: 6pt;
      text-align: center;
    }
    .info-box {
      background: ${COLORS.lightBg};
      padding: 12pt;
      border-radius: 6pt;
      border-left: 3pt solid ${COLORS.primary};
    }
    /* Cover Page */
    .cover-page {
      background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 50%, ${COLORS.accent} 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
    }
    .logo-circle {
      width: 70pt;
      height: 70pt;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15pt;
    }
    .logo-text {
      color: ${COLORS.primary};
      font-size: 28pt;
      font-weight: bold;
    }
    .title-box {
      background: rgba(255,255,255,0.2);
      padding: 12pt 35pt;
      border-radius: 25pt;
      margin-top: 15pt;
    }
    .divider-line {
      width: 50%;
      height: 1pt;
      background: linear-gradient(90deg, transparent, white, transparent);
      margin: 25pt 0;
    }
  </style>
</head>
<body>
  <!-- 封面页 -->
  <div class="page cover-page">
    <div class="logo-circle">
      <span class="logo-text">华</span>
    </div>
    <p style="font-size: 10pt; opacity: 0.9;">中海皓联教育科技集团</p>
    <p style="font-size: 12pt; font-weight: bold;">华芯百科</p>
    
    <div style="margin-top: 40pt;">
      <h1 style="color: white; font-size: 28pt; margin-bottom: 15pt; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
        ${input.studentInfo.name}
      </h1>
      <div class="title-box">
        <p style="font-size: 20pt; font-weight: bold;">生涯定制报告</p>
      </div>
    </div>
    
    <div class="divider-line"></div>
    
    <div style="margin-top: 20pt;">
      <p style="font-size: 10pt; margin-bottom: 6pt;">专属咨询顾问</p>
      <p style="font-size: 12pt; font-weight: bold; margin-bottom: 6pt;">${input.consultantInfo.name} 老师</p>
      <p style="font-size: 9pt; opacity: 0.9;">
        电话/微信：${input.consultantInfo.phone}
        ${input.consultantInfo.wechat && input.consultantInfo.wechat !== input.consultantInfo.phone ? ` / ${input.consultantInfo.wechat}` : ''}
      </p>
    </div>
    
    <p style="position: absolute; bottom: 25mm; font-size: 9pt; opacity: 0.8;">
      报告生成日期：${formattedDate}
    </p>
  </div>

  <!-- 背景介绍页 -->
  <div class="page" style="background: ${COLORS.lightBg};">
    <h1>机构介绍</h1>
    
    <div class="section">
      <h2>机构简介</h2>
      <p style="text-align: justify; line-height: 1.8;">
        中海皓联教育科技集团旗下华芯百科，是一家专注于AI智能教育规划的领先机构。
        我们致力于为初中至本科阶段的学生提供专业、个性化的生涯规划服务，
        帮助每一位学生找到最适合自己的发展道路，实现升学与职业目标的完美匹配。
      </p>
      <div class="info-box" style="margin-top: 12pt;">
        <p style="margin-bottom: 5pt;"><strong>地址：</strong>${INSTITUTION_INFO.address}</p>
        <p style="margin-bottom: 5pt;"><strong>电话：</strong>${INSTITUTION_INFO.phone}</p>
        <p style="margin-bottom: 5pt;"><strong>传真：</strong>${INSTITUTION_INFO.fax}</p>
        <p><strong>邮箱：</strong>${INSTITUTION_INFO.email}</p>
      </div>
    </div>
    
    <div class="section">
      <h2>核心服务</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10pt;">
        ${INSTITUTION_INFO.services.map((service, index) => `
          <div style="background: white; padding: 14pt; border-radius: 6pt; text-align: center; box-shadow: 0 2pt 6pt rgba(0,0,0,0.08);">
            <div style="width: 35pt; height: 35pt; background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary}); border-radius: 50%; margin: 0 auto 8pt; display: flex; align-items: center; justify-content: center; color: white; font-size: 14pt; font-weight: bold;">
              ${index + 1}
            </div>
            <p style="font-weight: bold; color: ${COLORS.primary};">${service}</p>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="section">
      <h2>专家团队</h2>
      <p style="color: #666; margin-bottom: 10pt;">我们汇聚了来自各领域的顶尖专家，为学生提供全方位的专业指导：</p>
      <div class="flex-grid">
        ${INSTITUTION_INFO.expertTeam.map((expert, index) => `
          <span class="tag" style="${index % 2 === 0 ? '' : `background: white; border: 1pt solid ${COLORS.secondary};`}">${expert}</span>
        `).join('')}
      </div>
    </div>
    
    <div class="page-number">2</div>
  </div>

  <!-- 测评结果页 1 -->
  <div class="page">
    <h1>测评结果及家庭分析</h1>
    
    <div class="section">
      <h2>性格测评结论</h2>
      
      <div class="highlight-box" style="margin-bottom: 14pt;">
        <p style="font-size: 8pt; margin-bottom: 4pt; opacity: 0.9;">人格核心类型</p>
        <p style="font-size: 16pt; font-weight: bold;">${generated.personalityAnalysis.coreType}</p>
      </div>
      
      <h3>性格优势</h3>
      <div class="grid-2" style="margin-bottom: 14pt;">
        ${generated.personalityAnalysis.strengths.map(s => `<div class="strength-item">✓ ${s}</div>`).join('')}
      </div>
      
      <h3>性格缺点</h3>
      <div class="grid-2" style="margin-bottom: 14pt;">
        ${generated.personalityAnalysis.weaknesses.map(w => `<div class="weakness-item">△ ${w}</div>`).join('')}
      </div>
      
      <h3>核心特质总结</h3>
      ${generated.personalityAnalysis.summary.map(s => `<p class="bullet-item">${s}</p>`).join('')}
    </div>
    
    <div class="page-number">3</div>
  </div>

  <!-- 测评结果页 2 -->
  <div class="page">
    <div class="section">
      <h2>职业适配分析</h2>
      <p style="color: #666; margin-bottom: 12pt; font-size: 9pt;">基于人格特质与兴趣倾向，为您推荐以下职业方向：</p>
      
      ${generated.careerMatches.map((career, index) => `
        <div class="card">
          <div style="display: flex; align-items: center; margin-bottom: 10pt;">
            <span style="width: 24pt; height: 24pt; background: ${COLORS.primary}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 10pt; font-size: 11pt;">
              ${index + 1}
            </span>
            <div>
              <h3 style="margin: 0; color: ${COLORS.primary};">${career.direction}</h3>
              <p style="font-size: 8pt; color: ${COLORS.secondary}; margin-top: 2pt;">${career.matchReason}</p>
            </div>
          </div>
          <div class="flex-grid">
            ${career.positions.map(p => `
              <span style="padding: 5pt 10pt; background: ${COLORS.lightBg}; color: ${COLORS.secondary}; border-radius: 4pt; font-size: 9pt; font-weight: bold;">${p}</span>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="section">
      <h2>家庭情况分析</h2>
      <div style="background: ${COLORS.lightBg}; padding: 14pt; border-radius: 6pt;">
        <div class="grid-2">
          <div>
            <p class="bullet-item"><strong>家庭结构：</strong>${input.familyInfo.structure}</p>
            <p class="bullet-item"><strong>家庭产业/父母职业：</strong>${input.familyInfo.parentOccupation}</p>
            <p class="bullet-item"><strong>经济预算：</strong>${input.familyInfo.budget}</p>
          </div>
          <div>
            <p class="bullet-item"><strong>家庭资源：</strong></p>
            <div style="padding-left: 16pt; margin-top: 5pt;">
              ${input.familyInfo.resources.map(r => `<span class="tag">${r}</span>`).join('')}
            </div>
          </div>
        </div>
        
        <div style="margin-top: 14pt; padding-top: 14pt; border-top: 1pt dashed ${COLORS.accent};">
          <h3>家庭诉求</h3>
          <p class="bullet-item"><strong>升学目标：</strong>${input.familyInfo.demands.educationGoal}</p>
          <p class="bullet-item"><strong>就业期望：</strong>${input.familyInfo.demands.careerExpectation}</p>
          <p class="bullet-item"><strong>地域偏好：</strong>${input.familyInfo.demands.locationPreference}</p>
        </div>
      </div>
    </div>
    
    <div class="page-number">4</div>
  </div>

  <!-- 咨询规划建议页 -->
  <div class="page">
    <h1>咨询规划建议</h1>
    
    <div class="section">
      <h2>核心发展路径</h2>
      ${generated.developmentPaths.map((path, index) => `
        <div style="display: flex; margin-bottom: 10pt; background: white; border-radius: 6pt; overflow: hidden; box-shadow: 0 2pt 6pt rgba(0,0,0,0.06);">
          <div style="width: 35pt; background: linear-gradient(180deg, ${COLORS.primary}, ${COLORS.secondary}); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14pt;">
            ${index + 1}
          </div>
          <div style="flex: 1; padding: 10pt 14pt;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10pt; font-size: 9pt;">
              <div>
                <p style="color: #999; margin-bottom: 3pt;">升学方向</p>
                <p style="font-weight: bold; color: ${COLORS.primary};">${path.educationDirection}</p>
              </div>
              <div>
                <p style="color: #999; margin-bottom: 3pt;">职业目标</p>
                <p style="font-weight: bold; color: ${COLORS.secondary};">${path.careerGoal}</p>
              </div>
              <div>
                <p style="color: #999; margin-bottom: 3pt;">资源适配</p>
                <p style="font-weight: bold;">${path.resourceMatch}</p>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="section">
      <h2>职业规划建议</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 22%;">就业领域</th>
            <th style="width: 39%;">短期发展路径</th>
            <th style="width: 39%;">长期发展路径</th>
          </tr>
        </thead>
        <tbody>
          ${generated.careerAdvice.map(advice => `
            <tr>
              <td style="font-weight: bold; color: ${COLORS.primary};">${advice.field}</td>
              <td>${advice.shortTermPath}</td>
              <td>${advice.longTermPath}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="section">
      <h2>家庭配合建议</h2>
      <div style="background: ${COLORS.lightBg}; padding: 14pt; border-radius: 6pt;">
        ${generated.familyCooperationAdvice.map((advice, index) => `
          <div style="display: flex; align-items: flex-start; gap: 10pt; ${index < generated.familyCooperationAdvice.length - 1 ? 'margin-bottom: 10pt;' : ''}">
            <span style="width: 22pt; height: 22pt; background: ${COLORS.secondary}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9pt; font-weight: bold; flex-shrink: 0;">
              ${index + 1}
            </span>
            <p style="line-height: 1.6;">${advice}</p>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="page-number">5</div>
  </div>

  <!-- 升学项目建议页 1 -->
  <div class="page">
    <h1>升学项目建议</h1>
    
    <div class="section">
      <h2>项目推荐列表</h2>
      <table style="font-size: 8pt;">
        <thead>
          <tr>
            <th style="width: 16%;">项目名称</th>
            <th style="width: 12%;">学费范围</th>
            <th style="width: 22%;">优势</th>
            <th style="width: 22%;">劣势</th>
            <th style="width: 12%;">推荐指数</th>
            <th style="width: 16%;">咨询费</th>
          </tr>
        </thead>
        <tbody>
          ${generated.educationProjects.map(project => `
            <tr>
              <td style="font-weight: bold;">${project.name}</td>
              <td>${project.tuitionRange}</td>
              <td>${project.advantages.map(a => `<span style="display: block;">• ${a}</span>`).join('')}</td>
              <td>${project.disadvantages.map(d => `<span style="display: block;">• ${d}</span>`).join('')}</td>
              <td style="text-align: center; color: ${COLORS.secondary}; font-weight: bold; font-size: 10pt;">
                ${'★'.repeat(project.recommendIndex)}${'☆'.repeat(5 - project.recommendIndex)}
              </td>
              <td>${project.consultingFeeRange}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="page-number">6</div>
  </div>

  <!-- 升学项目建议页 2 -->
  <div class="page">
    <h2>项目详解</h2>
    
    ${['升学类', '背景提升类', '兜底类'].map(category => {
      const categoryProjects = generated.educationProjects.filter(p => p.category === category);
      if (categoryProjects.length === 0) return '';
      
      return `
        <div style="margin-bottom: 16pt;">
          <h3 style="background: ${COLORS.accent}; padding: 6pt 10pt; border-radius: 4pt; margin-bottom: 10pt;">${category}</h3>
          ${categoryProjects.map(project => `
            <div class="card" style="font-size: 9pt;">
              <h4 style="color: ${COLORS.primary}; margin-bottom: 8pt; font-size: 10pt;">${project.name}</h4>
              <div class="grid-2">
                ${project.principle ? `<div><p style="color: #999; margin-bottom: 2pt;">项目原理</p><p>${project.principle}</p></div>` : ''}
                ${project.requirements ? `<div><p style="color: #999; margin-bottom: 2pt;">录取要求</p><p style="color: ${COLORS.secondary}; font-weight: bold;">${project.requirements}</p></div>` : ''}
                ${project.timeline ? `<div><p style="color: #999; margin-bottom: 2pt;">时间节点</p><p style="color: ${COLORS.secondary}; font-weight: bold;">${project.timeline}</p></div>` : ''}
                ${project.process ? `<div><p style="color: #999; margin-bottom: 2pt;">申请流程</p><p>${project.process}</p></div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }).join('')}
    
    <div class="page-number">7</div>
  </div>

  <!-- 申请时间表页 -->
  <div class="page">
    <h1>申请时间表</h1>
    
    <table style="font-size: 8pt;">
      <thead>
        <tr style="background: ${COLORS.secondary};">
          <th style="width: 14%;">阶段</th>
          <th style="width: 14%;">时间</th>
          <th style="width: 46%;">核心任务</th>
          <th style="width: 26%;">注意事项</th>
        </tr>
      </thead>
      <tbody>
        ${generated.timeline.map(item => `
          <tr>
            <td style="font-weight: bold; color: ${COLORS.primary};">${item.stage}</td>
            <td>${item.time}</td>
            <td>
              ${item.tasks.map((task, tIndex) => `
                <span style="display: inline-block; background: ${tIndex % 2 === 0 ? COLORS.lightBg : 'white'}; padding: 3pt 6pt; border-radius: 3pt; margin: 2pt; border: 0.5pt solid ${COLORS.accent};">${task}</span>
              `).join('')}
            </td>
            <td style="color: #666;">${item.notes}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    
    <div class="page-number">8</div>
  </div>

  <!-- 供应链项目推荐页 -->
  <div class="page">
    <h1>供应链项目推荐</h1>
    
    <div class="grid-2" style="gap: 14pt;">
      ${['语言培训', '游学研学', '实习项目', '科研/赛事'].map(category => {
        const categoryProjects = generated.supplyChainProjects.filter(p => p.category === category);
        
        return `
          <div style="background: ${COLORS.lightBg}; border-radius: 6pt; padding: 14pt; border: 1pt solid ${COLORS.accent};">
            <h3 style="color: ${COLORS.primary}; margin-bottom: 10pt; padding-bottom: 6pt; border-bottom: 2pt solid ${COLORS.primary};">${category}</h3>
            ${categoryProjects.map(project => `
              <div style="background: white; padding: 8pt; border-radius: 5pt; margin-bottom: 6pt;">
                <p style="font-weight: bold; color: ${COLORS.secondary}; font-size: 9pt; margin-bottom: 3pt;">${project.name}</p>
                <p style="font-size: 8pt; color: #666; margin-bottom: 3pt;">${project.description}</p>
                <p style="font-size: 8pt; color: ${COLORS.primary}; font-weight: bold;">✓ ${project.advantage}</p>
              </div>
            `).join('')}
          </div>
        `;
      }).join('')}
    </div>
    
    <div class="page-number">9</div>
  </div>

  <!-- 总结页 -->
  <div class="page">
    <h1>规划总结与行动建议</h1>
    
    <div class="section">
      <h2>整体规划逻辑</h2>
      <div class="info-box">
        <p style="line-height: 1.8;">${generated.summary.planningLogic}</p>
      </div>
    </div>
    
    <div class="section">
      <h2>学生核心竞争力</h2>
      <div class="highlight-box">
        <p style="font-size: 10pt; line-height: 1.8;">${generated.summary.coreCompetence}</p>
      </div>
    </div>
    
    <div class="section">
      <h2>后续行动建议</h2>
      ${generated.summary.actionSuggestions.map((suggestion, index) => `
        <div style="display: flex; align-items: center; gap: 10pt; padding: 10pt 14pt; background: white; border-radius: 5pt; margin-bottom: 8pt; box-shadow: 0 2pt 6pt rgba(0,0,0,0.06);">
          <span style="width: 24pt; height: 24pt; background: ${COLORS.secondary}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10pt; flex-shrink: 0;">
            ${index + 1}
          </span>
          <p>${suggestion}</p>
        </div>
      `).join('')}
    </div>
    
    <div class="section">
      <h2>机构服务承诺</h2>
      <div class="flex-grid">
        ${generated.summary.serviceCommitment.map(c => `
          <div style="padding: 8pt 14pt; background: ${COLORS.accent}; color: ${COLORS.primary}; border-radius: 16pt; font-size: 9pt; font-weight: bold;">
            ✓ ${c}
          </div>
        `).join('')}
      </div>
    </div>
    
    <div style="margin-top: 25pt; padding: 16pt; background: ${COLORS.lightBg}; border-radius: 6pt; text-align: center;">
      <p style="font-size: 12pt; color: ${COLORS.primary}; font-weight: bold; margin-bottom: 6pt;">
        亲爱的${input.studentInfo.name}同学
      </p>
      <p style="color: #666; line-height: 1.8;">
        每一个梦想都值得被认真对待，每一份努力都将开花结果。<br />
        华芯百科将陪伴你的每一步成长，助你成就精彩人生！
      </p>
    </div>
    
    <div class="page-number">10</div>
  </div>
</body>
</html>
  `;
}

