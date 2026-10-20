(function(){
  var $=function(s){return document.querySelector(s)};
  /* false = luôn hiện hiệu ứng (cánh hoa rơi, bung tim).
     true  = tắt hiệu ứng nếu máy của người xem bật chế độ "giảm chuyển động". */
  var RESPECT_REDUCED_MOTION=false;
  var reduce=RESPECT_REDUCED_MOTION&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce)document.documentElement.classList.add("calm");

  /* ===== Nội dung: sửa ở đây cho hợp với người ấy ===== */
  var LETTER=function(n){return (n||"Gửi tới cán bộ của em")+" ạ,\n\nHôm nay là ngày 20/10, em cũng không biết làm gì nên là tặng cán bộ một cái website ạ.\n\nEm chúc cán bộ bớt được chút bận rộn, thêm thật nhiều niềm vui và có thời gian dành cho những điều mình thích.\n\nMong những cố gắng của cán bộ luôn được ghi nhận, những dự định đều thuận lợi và mỗi ngày đều có điều khiến cán bộ mỉm cười.\n\nChúc cán bộ có một ngày 20/10 thật ý nghĩa và tràn đầy yêu thương✨"};
  var WHYS=[
    ["🎨 Cá tính riêng","Cán bộ có một phong cách rất riêng, không ai thay thế được."],
    ["🌿 Sự lạc quan","Dù có chuyện gì, cán bộ vẫn tìm thấy được điều tích cực để nhìn vào."],
    ["⚡ Sự năng động","Cán bộ khiến mọi thứ xung quanh sôi nổi hơn."],
    ["✨ Sự tinh tế","Cán bộ để ý những điều nhỏ mà người khác bỏ qua."],
    ["🎯 Sự nỗ lực","Cán bộ làm việc chăm chỉ và không bao giờ bỏ cuộc."],
    ["🌸 Sự bình tĩnh","luôn từ tốn, không vội vàng, nhờ vậy mọi chuyện đều êm hơn."]
  ];
  var WISHES=[
    "Chúc cán bộ luôn xinh đẹp theo cách của riêng mình.","Chúc cán bộ mỗi ngày đều có một lý do để mỉm cười.",
    "Chúc cán bộ khoẻ mạnh, bình an và được yêu thương thật nhiều.","Chúc mọi dự định của cán bộ đều thành hiện thực.",
    "Chúc cán bộ luôn được là chính mình, thoải mái và tự do.","Chúc cán bộ ăn ngon, ngủ ngon và ít lo nghĩ.",
    "Chúc cán bộ gặp thật nhiều điều may mắn.","Chúc bạn luôn được trân trọng đúng như giá trị của mình.",
    "Chúc cán bộ luôn có thời gian cho những điều mình thích.","Chúc cán bộ có thật nhiều niềm vui, bất ngờ và hạnh phúc."
  ];
  var FLOWERS=["🌸","🌷","🌹","🌺","🌼","💐","🪻", "💮","🪷","🏵️","🌻"];

  /* ===== Tên ===== */
  var nameEl=$("#name"),toEl=$("#to"),name="";
  function applyName(){name=nameEl.value.trim();toEl.textContent=name?"Gửi "+name+" 💌":"Gửi tới... 💌";
    try{localStorage.setItem("n2010",name)}catch(e){}}
  try{var saved=localStorage.getItem("n2010");if(saved){nameEl.value=saved}}catch(e){}
  nameEl.addEventListener("input",applyName);applyName();

  /* ===== Thư (gõ chữ) ===== */
  var typing,opened=false;
  function type(el,text){clearInterval(typing);var a=Array.from(text),i=0;el.textContent="";
    if(reduce){el.textContent=text;return}
    typing=setInterval(function(){el.textContent+=a[i++];if(i>=a.length)clearInterval(typing)},32)}
  function openLetter(){
    var l=$("#letter");
    if(opened){opened=false;clearInterval(typing);l.textContent="";$("#env").textContent="💌";$("#hint").textContent="Chạm vào phong thư";return}
    opened=true;$("#env").textContent="💝";$("#hint").textContent="Chạm để gấp thư lại";type(l,LETTER(name));
  }
  $("#env").addEventListener("click",openLetter);
  $("#start").addEventListener("click",function(){
    $("#gift").scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"});
    if(!opened)setTimeout(openLetter,reduce?0:500);
  });

  /* ===== 6 điều đặc biệt ===== */
  var wg=$("#whys");
  WHYS.forEach(function(w){
    var b=document.createElement("button");b.className="why";
    b.innerHTML="<b></b><span></span>";b.firstChild.textContent=w[0];b.lastChild.textContent=w[1];
    b.addEventListener("click",function(){b.classList.toggle("on")});wg.appendChild(b);
  });

  /* ===== Bó hoa ===== */
  var n=0;
  $("#more").addEventListener("click",function(){
    var s=document.createElement("span");s.textContent=FLOWERS[Math.random()*FLOWERS.length|0];$("#vase").appendChild(s);
    n++;$("#wish").textContent=WISHES[(n-1)%WISHES.length];
    $("#count").textContent="Đã tặng "+n+" bông hoa 💐";
  });

  /* ===== Cánh hoa rơi ===== */
  var cv=$("#fx"),cx=cv.getContext("2d"),W=0,H=0,items=[],E=["🌸","🌷","🌹","💗","🌺"];
  function mk(y){return{x:Math.random()*W,y:y==null?-20:y,s:14+Math.random()*16,v:.4+Math.random(),w:Math.random()*6.28,e:E[Math.random()*E.length|0]}}
  function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;items=[];
    for(var i=0;i<Math.min(26,W/24|0);i++)items.push(mk(Math.random()*H))}
  function draw(){cx.clearRect(0,0,W,H);
    items.forEach(function(p){if(!reduce){p.y+=p.v;p.w+=.02;p.x+=Math.sin(p.w)*.6;if(p.y>H+30)Object.assign(p,mk())}
      cx.font=p.s+"px serif";cx.fillText(p.e,p.x,p.y)});
    if(!reduce)requestAnimationFrame(draw)}
  addEventListener("resize",size);size();draw();

  /* ===== Chạm đâu bung tim đó ===== */
  addEventListener("pointerdown",function(e){
    if(reduce||(e.target.closest&&e.target.closest("input")))return;
    var set=["💖","🌸","✨"];
    for(var i=0;i<6;i++){var s=document.createElement("span");s.className="pop";s.textContent=set[i%3];
      s.style.left=e.clientX+"px";s.style.top=e.clientY+"px";
      s.style.setProperty("--dx",(Math.random()*120-60)+"px");s.style.setProperty("--dy",(-40-Math.random()*90)+"px");
      document.body.appendChild(s);(function(el){setTimeout(function(){el.remove()},900)})(s)}
  });
})();
