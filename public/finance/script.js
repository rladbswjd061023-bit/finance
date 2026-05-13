const interest = document.getElementById("interest");
const housing = document.getElementById("housing");
const support = document.getElementById("support");

const interestVal = document.getElementById("interestVal");
const housingVal = document.getElementById("housingVal");
const supportVal = document.getElementById("supportVal");

const fertilityRate = document.getElementById("fertilityRate");
const seoulRate = document.getElementById("seoulRate");
const birthIncrease = document.getElementById("birthIncrease");
const budget = document.getElementById("budget");

const ctx = document.getElementById("birthChart");

const labels = [
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030"
];

const baseNation = [
  0.72,
  0.71,
  0.70,
  0.69,
  0.68,
  0.67,
  0.66
];

const baseSeoul = [
  0.55,
  0.54,
  0.53,
  0.52,
  0.51,
  0.50,
  0.49
];

const chart = new Chart(ctx, {

  type:'line',

  data:{
    labels:labels,

    datasets:[
      {
        label:'전국 출산율',
        data:[...baseNation],
        borderWidth:4,
        tension:0.3
      },

      {
        label:'서울 출산율',
        data:[...baseSeoul],
        borderWidth:4,
        tension:0.3
      }
    ]
  },

  options:{
    responsive:true,

    scales:{
      y:{
        min:0.4,
        max:1.2
      }
    }
  }
});

function updateSimulation(){

  const i = Number(interest.value);
  const h = Number(housing.value);
  const s = Number(support.value);

  interestVal.innerText = i;
  housingVal.innerText = h;
  supportVal.innerText = s;

  const effect =
      (i * 0.0012) +
      (h * 0.0018) +
      (s * 0.001);

  const updatedNation = baseNation.map((v,index)=>{
      return Number(
          (v + effect * index).toFixed(2)
      );
  });

  const updatedSeoul = baseSeoul.map((v,index)=>{
      return Number(
          (v + effect * 1.2 * index).toFixed(2)
      );
  });

  chart.data.datasets[0].data = updatedNation;
  chart.data.datasets[1].data = updatedSeoul;

  chart.update();

  fertilityRate.innerText =
      updatedNation[6].toFixed(2);

  seoulRate.innerText =
      updatedSeoul[6].toFixed(2);

  const births =
      15000 +
      (i * 100) +
      (h * 180) +
      (s * 90);

  birthIncrease.innerText =
      "+" +
      (births / 10000).toFixed(1)
      + "만";

  const totalBudget =
      3 +
      (i * 0.015) +
      (h * 0.025) +
      (s * 0.01);

  budget.innerText =
      totalBudget.toFixed(1)
      + "조";
}

interest.addEventListener("input",updateSimulation);
housing.addEventListener("input",updateSimulation);
support.addEventListener("input",updateSimulation);

updateSimulation();