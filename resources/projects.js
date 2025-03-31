const l=[{name:"Country-Mentioned-Bot",description:"A Discord bot that detects if a country has been mentioned in a message on a Discord server and replies with Yui (from K-On!).",languages:["C#","Discord.Net"],url:"https://github.com/Civermau/Country-Mentioned-Bot",stargazers_count:0,forks_count:0},{name:"Discord-RPC",description:"Discord custom game status made with C# and winForms and Guna library for UI",languages:["C#","Guna","Discord.Net"],url:"https://github.com/Civermau/Discord-RPC",stargazers_count:0,forks_count:0},{name:"Twitch-API",description:"Twitch pubsub reader and Channel Points Reward manager made in C# with TwitchLib",languages:["C#","TwitchLib"],url:"https://github.com/Civermau/Twitch-API",stargazers_count:0,forks_count:0}];async function h(r){const s="https://api.github.com/users/Civermau/repos?sort=updated&direction=desc";try{const t=await fetch(s);if(t.status===403){const i=await(await fetch("https://api.github.com/rate_limit")).json(),n=new Date(i.resources.core.reset*1e3),c=new Date,u=n.getTime()-c.getTime(),g=Math.floor(u/6e4),p=Math.floor(u%6e4/1e3);return{projects:r,rateLimitMessage:`API rate limit reached, showing only ${r.length} selected projects. Please try again at ${n.toLocaleDateString()}, ${n.toLocaleTimeString()} (in ${g}m ${p}s)`}}if(!t.ok)throw new Error(`GitHub API error: ${t.status}`);const a=await t.json();return{projects:await Promise.all(a.map(async e=>{let i=[];try{const n=await fetch(e.languages_url);if(n.ok){const c=await n.json();i=Object.keys(c)}}catch(n){console.error(`Error fetching languages for ${e.name}:`,n)}return{name:e.name,description:e.description||"No description available",url:e.html_url,languages:i.length>0?i:["No languages found"],topics:e.topics||[],stargazers_count:e.stargazers_count,forks_count:e.forks_count,updated_at:e.updated_at}})),rateLimitMessage:""}}catch(t){return console.error("Error fetching GitHub repos:",t),{projects:r,rateLimitMessage:"Error fetching projects from GitHub. Showing fallback projects."}}}async function o(){if(document.getElementById("projects-container"))try{d(l);const{projects:r,rateLimitMessage:s}=await h(l);if(s){const t=document.getElementById("rate-limit-message");t&&(t.textContent=s,t.style.display="block")}else{const t=document.getElementById("rate-limit-message");t&&(t.style.display="none")}d(r)}catch(r){console.error("Error updating projects:",r);const s=document.getElementById("rate-limit-message");s&&(s.textContent="Error loading projects. Showing fallback projects.",s.style.display="block"),d(l)}}function d(r){const s=document.getElementById("projects-container");if(!s)return;const t=s.dataset.placeholderSrc;s.innerHTML="",r.forEach((a,m)=>{const e=document.createElement("div");e.className="column is-4",e.setAttribute("data-aos","fade-up"),e.setAttribute("data-aos-delay",(m*100).toString());const i=document.createElement("div");i.innerHTML=`
          <div class="card is-glass is-project">
            <div class="card-image">
              <figure class="image is-16by9">
                <img 
                  src="https://raw.githubusercontent.com/Civermau/${a.name}/refs/heads/master/Cover.png"
                  alt="${a.name}"
                  onerror="this.src='${t}'"
                />
              </figure>
            </div>

            <div class="card-content">
              <h3 class="title is-4 has-text-white mb-3">${a.name}</h3>

              <div class="tags mb-3">
                ${a.languages.map(n=>`<span class="tag is-info" style="background-color: #00000022;">${n}</span>`).join("")}
              </div>

              <p class="has-text-grey-light mb-4">${a.description||"No description available"}</p>
            </div>

            <div class="card-footer">
              <div class="card-footer-item">
                <div class="is-flex">
                  <div class="mr-4">
                    <span class="icon-text has-text-grey">
                      <span class="icon">
                        <i class="fas fa-star"></i>
                      </span>
                      <span>${a.stargazers_count||0}</span>
                    </span>
                  </div>
                  
                  <div>
                    <span class="icon-text has-text-grey">
                      <span class="icon">
                        <i class="fas fa-code-branch"></i>
                      </span>
                      <span>${a.forks_count||0}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="card-footer-item">
                <a href="${a.url||`https://github.com/Civermau/${a.name}`}" class="has-text-primary" target="_blank" rel="noopener noreferrer">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fab fa-github"></i>
                    </span>
                    <span>View</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        `,i.firstElementChild&&(e.appendChild(i.firstElementChild),s.appendChild(e))})}function f(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",o):o(),document.addEventListener("astro:page-load",o),document.addEventListener("astro:after-swap",o)}f();
