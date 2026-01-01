let points = 0;
const updatePoints = () => { document.getElementById('points').textContent = points; };

// Option selection
document.getElementById('indian-btn').addEventListener('click', () => {
    document.getElementById('calc-title').textContent = 'Indian Market SIP';
    document.getElementById('calculator').classList.remove('hidden');
    document.getElementById('extras').classList.remove('hidden');
    points += 10; updatePoints();
});
document.getElementById('crypto-btn').addEventListener('click', () => {
    document.getElementById('calc-title').textContent = 'Crypto SIP';
    document.getElementById('calculator').classList.remove('hidden');
    document.getElementById('extras').classList.remove('hidden');
    points += 10; updatePoints();
});

// Real-time input updates
['amount', 'period', 'return'].forEach(id => {
    document.getElementById(id).addEventListener('input', (e) => {
        document.getElementById(id + '-val').textContent = e.target.value;
    });
});

// Calculation
document.getElementById('calculate-btn').addEventListener('click', () => {
    const P = parseFloat(document.getElementById('amount').value);
    const years = parseFloat(document.getElementById('period').value);
    const r = parseFloat(document.getElementById('return').value) / 100 / 12;
    const n = years * 12;
    const fv = P * ((Math.pow(1 + r, n) - 1) / r);
    const invested = P * n;
    document.getElementById('summary').innerHTML = `Future Value: ₹${fv.toFixed(2)}<br>Total Invested: ₹${invested.toFixed(2)}<br>Wealth Gained: ₹${(fv - invested).toFixed(2)}`;
    document.getElementById('results').classList.remove('hidden');
    points += 20; updatePoints();
    
    // Chart
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: years}, (_, i) => `Year ${i+1}`),
            datasets: [{
                label: 'Projected Value',
                data: Array.from({length: years}, (_, i) => P * ((Math.pow(1 + r, (i+1)*12) - 1) / r)),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        }
    });
});

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(btn.dataset.tab).classList.remove('hidden');
        btn.classList.add('active');
        points += 5; updatePoints();
    });
});

// Quiz (simple example)
document.getElementById('quiz-btn').addEventListener('click', () => {
    alert('Quiz: What does SIP stand for? (Answer: Systematic Investment Plan) Points +15!');
    points += 15; updatePoints();
});

// Share
document.getElementById('share-btn').addEventListener('click', () => {
    navigator.share({ title: 'My SIP Projection', text: document.getElementById('summary').textContent });
});