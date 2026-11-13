'use strict';
const toggle=document.querySelector('#billingToggle');
const dialog=document.querySelector('#planDialog');
let yearly=false;
function updateBilling(){
 toggle.setAttribute('aria-checked',String(yearly));
 document.querySelector('#monthlyLabel').classList.toggle('chosen',!yearly);
 document.querySelector('#yearlyLabel').classList.toggle('chosen',yearly);
 document.querySelectorAll('[data-month]').forEach(price=>{price.textContent=yearly?price.dataset.year:price.dataset.month;});
 document.querySelectorAll('[data-annual]').forEach(detail=>{detail.textContent=yearly?'$'+detail.dataset.annual+' billed yearly.':'$'+detail.closest('.card').querySelector('[data-month]').dataset.month+' billed monthly.';});
 document.querySelector('#billingHelp').textContent=yearly?'Yearly billing. Pay once a year and save 20%.':'Monthly billing. Change your plan anytime.';
 document.querySelector('#status').textContent=yearly?'Yearly billing selected. Pro: $12 per month, $144 per year. Team: $24 per month, $288 per year.':'Monthly billing selected. Pro: $15 per month. Team: $30 per month.';
}
toggle.addEventListener('click',()=>{yearly=!yearly;updateBilling();});
document.querySelectorAll('[data-plan]').forEach(button=>button.addEventListener('click',()=>{
 const card=button.closest('.card'); const price=card.querySelector('[data-month]');
 document.querySelector('#dialogTitle').textContent=button.dataset.plan+' looks good on you.';
 document.querySelector('#selectionDetail').textContent=button.dataset.plan==='Starter'?'Your selection: Starter — free forever.':'Your selection: '+button.dataset.plan+' — $'+price.textContent+'/month. '+card.querySelector('.billing-detail').textContent;
 dialog.showModal();
}));
document.querySelector('#closeDialog').addEventListener('click',()=>dialog.close());
document.querySelector('#backToPlans').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
updateBilling();
