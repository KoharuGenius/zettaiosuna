
function dispbutton1(subtext){

    $('.box-container').remove();

    const strhtml=
`
<!-- 幅300px × 高さ300px の矩形 -->
  <div class="box-container">
    <div class="warning-tape">SYSTEM WARNING</div>
    <button class="caution-button" id="cautionBtn">
      <div class="btn-caution-title">⚠ CAUTION ⚠</div>
      <div class="btn-sub-text">${subtext}</div>
    </button>
  </div>

  <!-- カットイン演出コンテナ -->
  <div class="cutin-overlay" id="cutinOverlay">
    <div class="cutin-banner">
      <div class="cutin-text">You Win !</div>
    </div>
  </div>

  <!-- 画面フラッシュ用 -->
  <div class="flash-bg" id="flashBg"></div>
`;
    $('.1_fore').append(strhtml);
};

/* ----------------------------------
       Web Audio API による効果音生成
       ---------------------------------- */
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function initAudio() {
      if (!audioCtx) {
        audioCtx = new AudioCtx();
      }
    }

    // 花火の発射＆破裂音
    function playFireworkSound() {
      if (!audioCtx) return;
      
      const now = audioCtx.currentTime;
      
      // 発射音 (ピューン)
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.25);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.25);

      // 破裂音 (ドン！/パーン！)
      setTimeout(() => {
        if (!audioCtx) return;
        const pNow = audioCtx.currentTime;
        
        // ノイズバースト
        const bufferSize = audioCtx.sampleRate * 0.3;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.4, pNow);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, pNow + 0.3);

        noise.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start(pNow);
      }, 200);
    }

    // ファンファーレ音 (You Win!)
    function playFanfareSound() {
      if (!audioCtx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        const startTime = now + idx * 0.08;
        const duration = (idx === notes.length - 1) ? 0.6 : 0.12;
        
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    }

    /* ----------------------------------
       DOM要素による花火アニメーション
       ---------------------------------- */
    const colors = ['#ff0055', '#ffcc00', '#00ffcc', '#ff9900', '#cc00ff', '#ffffff'];

    function createFirework(x, y) {
      playFireworkSound();

      const particleCount = 40;
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'firework-particle';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        p.style.backgroundColor = color;
        p.style.boxShadow = `0 0 8px ${color}`;
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;

        document.body.appendChild(p);

        // 拡散角度とスピード
        const angle = (Math.PI * 2 / particleCount) * i + (Math.random() * 0.2);
        const speed = Math.random() * 120 + 60;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        particles.push({ element: p, vx, vy, alpha: 1 });
      }

      // 粒子のアニメーション駆動
      let startTime = performance.now();
      function animateParticles(time) {
        const elapsed = (time - startTime) / 1000;
        let active = false;

        particles.forEach(p => {
          if (p.alpha <= 0) return;

          const currentX = x + p.vx * elapsed;
          // 重力でやや下方向に落下
          const currentY = y + p.vy * elapsed + (80 * elapsed * elapsed); 
          p.alpha = Math.max(0, 1 - elapsed / 0.8);

          p.element.style.transform = `translate(${currentX - x}px, ${currentY - y}px) scale(${p.alpha})`;
          p.element.style.opacity = p.alpha;

          if (p.alpha > 0) active = true;
        });

        if (active) {
          requestAnimationFrame(animateParticles);
        } else {
          // メモリ解放：DOM削除
          particles.forEach(p => p.element.remove());
        }
      }

      requestAnimationFrame(animateParticles);
    }


    function seteventbutton1(nextlabel){
    /* ----------------------------------
       メイン処理：ボタンクリック時イベント
       ---------------------------------- */
    const cautionBtn = document.getElementById('cautionBtn');
    const cutinOverlay = document.getElementById('cutinOverlay');
    const flashBg = document.getElementById('flashBg');
    let isPlaying = false;

    cautionBtn.addEventListener('click', () => {
      if (isPlaying) return;
      isPlaying = true;

      // Web Audio の有効化
      initAudio();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // 画面フラッシュ
      flashBg.classList.remove('flash');
      void flashBg.offsetWidth; // リフロー発生させてアニメーション再始動
      flashBg.classList.add('flash');

      // 1. カットイン表示 & ファンファーレ
      cutinOverlay.classList.add('active');
      playFanfareSound();

      // 2. 花火5発を順番に打ち上げる
      const fireworkPositions = [
        { x: window.innerWidth * 0.25, y: window.innerHeight * 0.3 },
        { x: window.innerWidth * 0.75, y: window.innerHeight * 0.35 },
        { x: window.innerWidth * 0.50, y: window.innerHeight * 0.2 },
        { x: window.innerWidth * 0.30, y: window.innerHeight * 0.5 },
        { x: window.innerWidth * 0.70, y: window.innerHeight * 0.45 }
      ];

      fireworkPositions.forEach((pos, index) => {
        setTimeout(() => {
          createFirework(pos.x, pos.y);
        }, index * 250); // 250ms間隔で5発
      });

      // 3. 3秒後にカットインを解除して再度押せる状態に戻す
      setTimeout(() => {
        cutinOverlay.classList.remove('active');
        isPlaying = false;
        TYRANO.kag.ftag.startTag("jump", {
            target: nextlabel, // 移動先のラベル名
            storage: "scene1.ks"      // 移動先のシナリオファイル名（省略すると現在のファイル内）
        });
      }, 3200);
    });
}

