let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const pAno = document.querySelector('#ano');
  let ano= 2023
  
  pAno.innerHTML=ano
  
let i = -1
  const mes = document.querySelector('.mes');

  document.querySelector(".prev").addEventListener("click", () => {
   
    mes.innerText = months[i-1];
    console.log(months[i])
    if(i<=-1){i=13;};
    i--;
    if(i>=12){
      pAno.innerHTML=ano--

    }
    
console.log(i);
    
  });

  document.querySelector(".next").addEventListener("click", () => {
    if(i>10){i=-1;};
    mes.innerText = months[i+1];
    if(i>=10){
      pAno.innerHTML=ano++

    }
    
     console.log(i);
     i++;
  });
  
