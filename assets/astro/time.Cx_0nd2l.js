function N(e){const c=new Date,u=c.toISOString().slice(0,10),f=c.getHours(),b=c.getMinutes(),r=c.getSeconds();e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
        <span class="calc-panel__title" style="display:flex;align-items:center;gap:.5rem">
          <span style="font-size:1.25rem">⏱️</span>
          <span>Time Calculator</span>
        </span>
      </div>

      <div class="calc-panel__body">
        <!-- Mode Switcher Tabs -->
        <div class="segment" style="width:100%;margin-bottom:1.5rem;display:flex;flex-wrap:wrap">
          <button type="button" class="segment__btn active" data-tab="tab-duration" style="flex:1">Add / Subtract Time</button>
          <button type="button" class="segment__btn" data-tab="tab-date" style="flex:1">Time From Date</button>
          <button type="button" class="segment__btn" data-tab="tab-diff" style="flex:1">Between Dates</button>
        </div>

        <!-- ── TAB 1: DURATION MATH (ADD/SUBTRACT DURATIONS) ──── -->
        <div id="tab-duration" class="tab-panel active">
          <p style="font-size:.875rem;color:var(--color-text-muted);margin-bottom:1.25rem">
            Add or subtract two time durations. Empty fields are treated as zero.
          </p>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1rem">
            <div style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:.75rem">Time 1</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.65rem">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Days</label>
                <input class="form-input mono" type="number" id="t1-days" min="0" placeholder="0" value="0">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Hours</label>
                <input class="form-input mono" type="number" id="t1-hours" min="0" placeholder="0" value="4">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Mins</label>
                <input class="form-input mono" type="number" id="t1-mins" min="0" placeholder="0" value="35">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Secs</label>
                <input class="form-input mono" type="number" id="t1-secs" min="0" placeholder="0" value="20">
              </div>
            </div>
          </div>

          <!-- Operator selector -->
          <div style="display:flex;justify-content:center;gap:1.5rem;margin:1rem 0;padding:.5rem 0">
            <label style="display:inline-flex;align-items:center;gap:.5rem;font-weight:700;font-size:1rem;cursor:pointer;color:var(--color-text)">
              <input type="radio" name="time-op" value="+" checked style="accent-color:var(--color-accent);transform:scale(1.2)"> Add (+)
            </label>
            <label style="display:inline-flex;align-items:center;gap:.5rem;font-weight:700;font-size:1rem;cursor:pointer;color:var(--color-text)">
              <input type="radio" name="time-op" value="-" style="accent-color:var(--color-accent);transform:scale(1.2)"> Subtract (−)
            </label>
          </div>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1.5rem">
            <div style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:.75rem">Time 2</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.65rem">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Days</label>
                <input class="form-input mono" type="number" id="t2-days" min="0" placeholder="0" value="0">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Hours</label>
                <input class="form-input mono" type="number" id="t2-hours" min="0" placeholder="0" value="2">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Mins</label>
                <input class="form-input mono" type="number" id="t2-mins" min="0" placeholder="0" value="45">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Secs</label>
                <input class="form-input mono" type="number" id="t2-secs" min="0" placeholder="0" value="50">
              </div>
            </div>
          </div>

          <div style="display:flex;gap:.75rem">
            <button class="btn btn--primary btn--lg" id="btn-calc-duration" style="flex:1">Calculate Result</button>
            <button class="btn btn--ghost" id="btn-clear-duration">Clear</button>
          </div>

          <!-- Result Card 1 -->
          <div class="result-box" id="result-duration" style="margin-top:1.5rem">
            <div class="result-box__label">Result Duration</div>
            <div class="result-box__value mono" id="res-dur-main">7 hrs 21 mins 10 secs</div>
            <div class="result-box__sub" id="res-dur-stats"></div>
            <div class="result-box__steps" id="res-dur-steps" style="margin-top:1.25rem"></div>
          </div>
        </div>

        <!-- ── TAB 2: DATE & TIME ARITHMETIC ──────────────────── -->
        <div id="tab-date" class="tab-panel" style="display:none">
          <p style="font-size:.875rem;color:var(--color-text-muted);margin-bottom:1.25rem">
            Add or subtract time from a starting date and time to find the exact target calendar date.
          </p>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1rem">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem">
              <span style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted)">Start Date &amp; Time</span>
              <button type="button" id="btn-now-date" style="font-size:.8rem;color:var(--color-accent);font-weight:600;background:none;border:none;cursor:pointer">⚡ Use Current Time</button>
            </div>

            <div class="form-row" style="margin-bottom:1rem">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Start Date</label>
                <input class="form-input" type="date" id="date-start" value="${u}">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Time Format</label>
                <select class="form-select" id="date-format-select">
                  <option value="24" selected>24-Hour Clock</option>
                  <option value="12">12-Hour Clock (AM/PM)</option>
                </select>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(3,1fr) auto;gap:.65rem;align-items:end">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Hour</label>
                <input class="form-input mono" type="number" id="date-hour" min="0" max="23" value="${f}">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Minute</label>
                <input class="form-input mono" type="number" id="date-min" min="0" max="59" value="${b}">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Second</label>
                <input class="form-input mono" type="number" id="date-sec" min="0" max="59" value="${r}">
              </div>
              <div class="form-group" id="ampm-group" style="margin-bottom:0;display:none">
                <label class="form-label" style="font-size:.78rem">AM/PM</label>
                <select class="form-select" id="date-ampm">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Operator selector -->
          <div style="display:flex;justify-content:center;gap:1.5rem;margin:1rem 0;padding:.5rem 0">
            <label style="display:inline-flex;align-items:center;gap:.5rem;font-weight:700;font-size:1rem;cursor:pointer;color:var(--color-text)">
              <input type="radio" name="date-op" value="+" checked style="accent-color:var(--color-accent);transform:scale(1.2)"> Add (+)
            </label>
            <label style="display:inline-flex;align-items:center;gap:.5rem;font-weight:700;font-size:1rem;cursor:pointer;color:var(--color-text)">
              <input type="radio" name="date-op" value="-" style="accent-color:var(--color-accent);transform:scale(1.2)"> Subtract (−)
            </label>
          </div>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1.5rem">
            <div style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:.75rem">Time to Add / Subtract</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.65rem">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Days</label>
                <input class="form-input mono" type="number" id="diff-days" min="0" placeholder="0" value="7">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Hours</label>
                <input class="form-input mono" type="number" id="diff-hours" min="0" placeholder="0" value="12">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Mins</label>
                <input class="form-input mono" type="number" id="diff-mins" min="0" placeholder="0" value="30">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Secs</label>
                <input class="form-input mono" type="number" id="diff-secs" min="0" placeholder="0" value="0">
              </div>
            </div>
          </div>

          <div style="display:flex;gap:.75rem">
            <button class="btn btn--primary btn--lg" id="btn-calc-date" style="flex:1">Calculate New Date</button>
            <button class="btn btn--ghost" id="btn-clear-date">Clear</button>
          </div>

          <!-- Result Card 2 -->
          <div class="result-box" id="result-date" style="margin-top:1.5rem">
            <div class="result-box__label">Target Date &amp; Time</div>
            <div class="result-box__value" id="res-date-main" style="font-size:1.75rem">—</div>
            <div class="result-box__sub" id="res-date-stats"></div>
          </div>
        </div>

        <!-- ── TAB 3: DURATION BETWEEN TWO DATES ──────────────── -->
        <div id="tab-diff" class="tab-panel" style="display:none">
          <p style="font-size:.875rem;color:var(--color-text-muted);margin-bottom:1.25rem">
            Calculate the exact time difference (days, hours, minutes, seconds) between two calendar timestamps.
          </p>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1rem">
            <div style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:.75rem">Start Date &amp; Time</div>
            <div class="form-row">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Date</label>
                <input class="form-input" type="date" id="between-start-date" value="${u}">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Time</label>
                <input class="form-input mono" type="time" id="between-start-time" step="1" value="09:00:00">
              </div>
            </div>
          </div>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1.5rem">
            <div style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:.75rem">End Date &amp; Time</div>
            <div class="form-row">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Date</label>
                <input class="form-input" type="date" id="between-end-date" value="${u}">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Time</label>
                <input class="form-input mono" type="time" id="between-end-time" step="1" value="17:30:00">
              </div>
            </div>
          </div>

          <div style="display:flex;gap:.75rem">
            <button class="btn btn--primary btn--lg" id="btn-calc-between" style="flex:1">Calculate Difference</button>
            <button class="btn btn--ghost" id="btn-clear-between">Clear</button>
          </div>

          <!-- Result Card 3 -->
          <div class="result-box" id="result-between" style="margin-top:1.5rem">
            <div class="result-box__label">Elapsed Time Difference</div>
            <div class="result-box__value mono" id="res-between-main">8 hrs 30 mins 0 secs</div>
            <div class="result-box__sub" id="res-between-stats"></div>
          </div>
        </div>

        <!-- How-to Guide Component -->
        <div class="how-to" style="margin-top:2rem">
          <div class="how-to__title">Time Calculation Guide</div>
          <div class="how-to__body">
            <p><strong>1 Minute = 60 Seconds</strong> • <strong>1 Hour = 60 Minutes (3,600 Seconds)</strong> • <strong>1 Day = 24 Hours (86,400 Seconds)</strong></p>
            <ul style="margin-top:.5rem">
              <li><strong>Addition with carryover:</strong> When seconds or minutes reach 60, they roll over into the next higher unit (+1 minute or +1 hour).</li>
              <li><strong>Subtraction with borrowing:</strong> When subtracting larger values from smaller ones, 1 unit is borrowed from the preceding higher column (e.g. 1 hour borrows 60 minutes).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `}function M(e,c,u){const f=(Number(e.days)||0)*86400+(Number(e.hours)||0)*3600+(Number(e.mins)||0)*60+(Number(e.secs)||0),b=(Number(u.days)||0)*86400+(Number(u.hours)||0)*3600+(Number(u.mins)||0)*60+(Number(u.secs)||0),r=c==="+"?f+b:f-b,y=r<0,g=Math.abs(r),m=Math.floor(g/86400),o=g%86400,i=Math.floor(o/3600),v=o%3600,p=Math.floor(v/60),n=v%60,d=[];m>0&&d.push(`${m} day${m!==1?"s":""}`),(i>0||m>0)&&d.push(`${i} hr${i!==1?"s":""}`),(p>0||i>0||m>0)&&d.push(`${p} min${p!==1?"s":""}`),d.push(`${n} sec${n!==1?"s":""}`);const t=(y?"− ":"")+d.join(" ");return{totalSec:r,isNegative:y,days:m,hours:i,mins:p,secs:n,formatted:t,totalDays:(r/86400).toFixed(4),totalHours:(r/3600).toFixed(4),totalMinutes:(r/60).toFixed(2),totalSeconds:r,s1:f,s2:b,op:c}}function $(e,c,u,f,b,r,y,g,m){const o=e.split("-").map(Number);if(o.length!==3)return null;const i=new Date(o[0],o[1]-1,o[2],Number(c)||0,Number(u)||0,Number(f)||0);if(isNaN(i.getTime()))return null;const v=(Number(r)||0)*86400+(Number(y)||0)*3600+(Number(g)||0)*60+(Number(m)||0),p=b==="+"?i.getTime()+v*1e3:i.getTime()-v*1e3,n=new Date(p),d={weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0},t=n.toLocaleDateString(void 0,d),s=((p-i.getTime())/(86400*1e3)).toFixed(2);return{targetDate:n,formatted:t,dayOfWeek:n.toLocaleDateString(void 0,{weekday:"long"}),isoString:n.toISOString(),diffDays:s}}function z(e,c,u,f){const b=new Date(`${e}T${c||"00:00:00"}`),r=new Date(`${u}T${f||"00:00:00"}`);if(isNaN(b.getTime())||isNaN(r.getTime()))return null;const y=r.getTime()-b.getTime(),g=y<0,m=Math.floor(Math.abs(y)/1e3),o=Math.floor(m/86400),i=m%86400,v=Math.floor(i/3600),p=i%3600,n=Math.floor(p/60),d=p%60,t=[];o>0&&t.push(`${o} day${o!==1?"s":""}`),t.push(`${v} hr${v!==1?"s":""}`),t.push(`${n} min${n!==1?"s":""}`),t.push(`${d} sec${d!==1?"s":""}`);const s=(g?"− ":"")+t.join(" "),l=Math.floor(y/1e3);return{isNegative:g,days:o,hours:v,mins:n,secs:d,formatted:s,totalDays:(l/86400).toFixed(4),totalHours:(l/3600).toFixed(2),totalMinutes:(l/60).toFixed(1),totalSeconds:l,totalWeeks:(l/(86400*7)).toFixed(2)}}function k(e){const c=e.querySelectorAll(".segment__btn"),u=e.querySelectorAll(".tab-panel");c.forEach(t=>{t.addEventListener("click",()=>{c.forEach(a=>a.classList.remove("active")),u.forEach(a=>{a.style.display="none",a.classList.remove("active")}),t.classList.add("active");const s=t.getAttribute("data-tab"),l=e.querySelector("#"+s);l&&(l.style.display="block",l.classList.add("active"))})});const f=e.querySelector("#btn-calc-duration"),b=e.querySelector("#btn-clear-duration"),r=()=>{const t={days:e.querySelector("#t1-days").value,hours:e.querySelector("#t1-hours").value,mins:e.querySelector("#t1-mins").value,secs:e.querySelector("#t1-secs").value},s=e.querySelector('input[name="time-op"]:checked')?.value||"+",l={days:e.querySelector("#t2-days").value,hours:e.querySelector("#t2-hours").value,mins:e.querySelector("#t2-mins").value,secs:e.querySelector("#t2-secs").value},a=M(t,s,l);e.querySelector("#res-dur-main").textContent=a.formatted,e.querySelector("#res-dur-stats").innerHTML=`
      <div class="result-stat">
        <div class="result-stat__label">Total Hours</div>
        <div class="result-stat__value">${Number(a.totalHours).toLocaleString()} hrs</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Minutes</div>
        <div class="result-stat__value">${Number(a.totalMinutes).toLocaleString()} mins</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Seconds</div>
        <div class="result-stat__value">${a.totalSeconds.toLocaleString()} s</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Decimal Days</div>
        <div class="result-stat__value">${a.totalDays} days</div>
      </div>
    `,e.querySelector("#res-dur-steps").innerHTML=`
      <div class="result-box__steps-title">Step-by-Step Breakdown</div>
      <div class="result-box__step">
        <div class="result-box__step-num">1</div>
        <div style="flex:1">Time 1 total seconds: ${a.s1.toLocaleString()} s</div>
      </div>
      <div class="result-box__step">
        <div class="result-box__step-num">2</div>
        <div style="flex:1">Time 2 total seconds: ${a.s2.toLocaleString()} s</div>
      </div>
      <div class="result-box__step">
        <div class="result-box__step-num">3</div>
        <div style="flex:1">Operation: ${a.s1.toLocaleString()} ${a.op} ${a.s2.toLocaleString()} = ${a.totalSec.toLocaleString()} seconds</div>
      </div>
      <div class="result-box__step">
        <div class="result-box__step-num">4</div>
        <div style="flex:1">Normalized conversion: ${a.formatted}</div>
      </div>
    `};f&&(f.addEventListener("click",r),r()),b&&b.addEventListener("click",()=>{["#t1-days","#t1-hours","#t1-mins","#t1-secs","#t2-days","#t2-hours","#t2-mins","#t2-secs"].forEach(t=>{const s=e.querySelector(t);s&&(s.value="")}),r()});const y=e.querySelector("#btn-calc-date"),g=e.querySelector("#btn-clear-date"),m=e.querySelector("#btn-now-date"),o=e.querySelector("#date-format-select"),i=e.querySelector("#ampm-group");o&&o.addEventListener("change",()=>{if(o.value==="12"){i.style.display="block";const t=e.querySelector("#date-hour");let s=Number(t.value)||0;const l=e.querySelector("#date-ampm");s>=12?(l.value="PM",s>12&&(s-=12)):(l.value="AM",s===0&&(s=12)),t.value=s,t.max="12",t.min="1"}else{i.style.display="none";const t=e.querySelector("#date-hour");t.max="23",t.min="0"}}),m&&m.addEventListener("click",()=>{const t=new Date;e.querySelector("#date-start").value=t.toISOString().slice(0,10);const s=o?.value==="12";let l=t.getHours();if(s){const a=l>=12?"PM":"AM";e.querySelector("#date-ampm").value=a,l=l%12||12}e.querySelector("#date-hour").value=l,e.querySelector("#date-min").value=t.getMinutes(),e.querySelector("#date-sec").value=t.getSeconds(),v()});const v=()=>{const t=e.querySelector("#date-start").value;let s=Number(e.querySelector("#date-hour").value)||0;const l=Number(e.querySelector("#date-min").value)||0,a=Number(e.querySelector("#date-sec").value)||0;if(o?.value==="12"){const _=e.querySelector("#date-ampm").value;_==="PM"&&s<12&&(s+=12),_==="AM"&&s===12&&(s=0)}const x=e.querySelector('input[name="date-op"]:checked')?.value||"+",w=e.querySelector("#diff-days").value,T=e.querySelector("#diff-hours").value,D=e.querySelector("#diff-mins").value,q=e.querySelector("#diff-secs").value,h=$(t,s,l,a,x,w,T,D,q);if(!h){e.querySelector("#res-date-main").textContent="Please enter a valid date";return}e.querySelector("#res-date-main").textContent=h.formatted,e.querySelector("#res-date-stats").innerHTML=`
      <div class="result-stat">
        <div class="result-stat__label">Day of Week</div>
        <div class="result-stat__value">${h.dayOfWeek}</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Offset from Start</div>
        <div class="result-stat__value">${x}${Math.abs(h.diffDays)} days</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">ISO 8601</div>
        <div class="result-stat__value" style="font-size:.8rem">${h.isoString.slice(0,19)}</div>
      </div>
    `};y&&(y.addEventListener("click",v),v()),g&&g.addEventListener("click",()=>{["#diff-days","#diff-hours","#diff-mins","#diff-secs"].forEach(t=>{const s=e.querySelector(t);s&&(s.value="0")}),v()});const p=e.querySelector("#btn-calc-between"),n=e.querySelector("#btn-clear-between"),d=()=>{const t=e.querySelector("#between-start-date").value,s=e.querySelector("#between-start-time").value,l=e.querySelector("#between-end-date").value,a=e.querySelector("#between-end-time").value,S=z(t,s,l,a);if(!S){e.querySelector("#res-between-main").textContent="Please select valid start and end timestamps";return}e.querySelector("#res-between-main").textContent=S.formatted,e.querySelector("#res-between-stats").innerHTML=`
      <div class="result-stat">
        <div class="result-stat__label">Total Hours</div>
        <div class="result-stat__value">${Number(S.totalHours).toLocaleString()} hrs</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Minutes</div>
        <div class="result-stat__value">${Number(S.totalMinutes).toLocaleString()} mins</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Seconds</div>
        <div class="result-stat__value">${S.totalSeconds.toLocaleString()} s</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Weeks</div>
        <div class="result-stat__value">${S.totalWeeks} wks</div>
      </div>
    `};p&&(p.addEventListener("click",d),d()),n&&n.addEventListener("click",()=>{const t=new Date;e.querySelector("#between-start-date").value=t.toISOString().slice(0,10),e.querySelector("#between-end-date").value=t.toISOString().slice(0,10),e.querySelector("#between-start-time").value="00:00:00",e.querySelector("#between-end-time").value="00:00:00",d()})}export{k as bindEvents,z as calculateBetweenDates,$ as calculateDateMath,M as calculateDurationMath,N as render};
