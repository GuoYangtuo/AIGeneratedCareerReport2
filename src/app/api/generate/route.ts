import { NextRequest, NextResponse } from 'next/server';
import { generateReportContent } from '@/lib/deepseek';
import type { ReportInputData, FullReportData } from '@/types/report';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input } = body as { input: ReportInputData };

    // 从环境变量读取 API Key
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: '服务器未配置 DeepSeek API Key，请联系管理员' },
        { status: 500 }
      );
    }

    // 验证必填字段
    if (!input.studentInfo.name || !input.studentInfo.grade) {
      return NextResponse.json(
        { error: '请填写学生基础信息' },
        { status: 400 }
      );
    }

    // 调用 DeepSeek API 生成内容
    const generated = await generateReportContent(input, apiKey);

    const fullReport: FullReportData = {
      input,
      generated,
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, data: fullReport });
  } catch (error) {
    console.error('生成报告失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '生成报告失败，请重试' },
      { status: 500 }
    );
  }
}
