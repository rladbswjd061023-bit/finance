function analyzePolicy() {
    // 1. 입력값 가져오기
    const h = parseFloat(document.getElementById('households').value);
    const i = parseFloat(document.getElementById('interestGap').value);
    
    // 2. PPT 예산 산정 산식
    // (5억 * 금리차 3%) * 10만 가구 = 1.5조원
    const perSavings = (500000000 * (i / 100)) / 10000; // 가구당 지원액(만원)
    const totalBudget = (500000000 * (i / 100) * (h * 10000)) / 100000000; // 총 예산(억원)

    // 3. 분석 결과 출력
    const resultBox = document.getElementById('analysisResult');
    resultBox.innerHTML = `
        <p><strong>[정책 타당성 분석 리포트]</strong></p>
        <p>지원 대상 <strong>${h}만 가구</strong>에 대하여 <strong>${i}%p</strong>의 금리 혜택을 보전할 경우:</p>
        <p>• 가구당 연간 이자 지원액: <span class="highlight">${Math.floor(perSavings).toLocaleString()}만원</span></p>
        <p>• 총 연간 소요 예산: <span class="highlight">${Math.floor(totalBudget * 1000).toLocaleString()}억원</span></p>
        <div class="insight">
            <strong>금융공학적 분석 제언:</strong><br>
            ${totalBudget * 1000 > 20000 ? 
            "⚠️ 현재 재정 투입 규모가 GDP 대비 예산 비중을 상회할 우려가 있습니다. 대상을 출산 1년 이내 가구로 선별하여 타겟팅할 것을 제안합니다." : 
            "✅ 안정적인 재정 운용 범위 내에서 신혼부부의 가처분 소득을 증대시켜 실질적인 출산 유인 효과를 기대할 수 있는 최적의 정책 규모입니다."}
        </div>
    `;
}