class Snowflake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;
    this.alpha = 0;
    this.reset();
  }
  reset() {
    this.x = this.randBetween(0, window.innerWidth);
    this.y = this.randBetween(0, -window.innerHeight);
    this.vx = this.randBetween(-3, 3);
    this.vy = this.randBetween(2, 5);
    this.radius = this.randBetween(1, 4);
    this.alpha = this.randBetween(0.1, 0.9);
  }
  randBetween(min, max) {
    return min + Math.random() * (max - min);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y + this.radius > window.innerHeight) {
      this.reset();
    }
  }
}
class Snow {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    window.addEventListener('resize', () => this.onResize());
    this.onResize();
    this.updateBound = this.update.bind(this);
    requestAnimationFrame(this.updateBound);
    this.createSnowflakes();
  }
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  createSnowflakes() {
    const flakes = window.innerWidth / 4;
    this.snowflakes = [];
    for (let s = 0; s < flakes; s++) {
      this.snowflakes.push(new Snowflake());
    }
  }
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let flake of this.snowflakes) {
      flake.update();
      this.ctx.save();
      this.ctx.fillStyle = '#FFF';
      this.ctx.beginPath();
      this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.globalAlpha = flake.alpha;
      this.ctx.fill();
      this.ctx.restore();
    }
    requestAnimationFrame(this.updateBound);
  }
}
new Snow();
  // 设置目标新年时间，这里假设是2025年1月1日0点0分0秒，你可以根据实际情况修改
  const targetDate = new Date('2025-01-01T00:00:00');

  function show_runtime() {
    const now = new Date();
    const gap = targetDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    document.getElementById('day').innerText = d;
    document.getElementById('hour').innerText = h;
    document.getElementById('minute').innerText = m;
    document.getElementById('second').innerText = s;

    if (gap <= 0) {
      newyear();
      window.location.href = "AE-MerryChristmas.html";
    }
  }

  function newyear() {
    document.getElementById('title').innerText = 'Happy New Year';
    document.getElementById('day').innerText = '新';
    document.getElementById('hour').innerText = '年';
    document.getElementById('minute').innerText = '快';
    document.getElementById('second').innerText = '乐';
  }

  var time = setInterval(() => {
    show_runtime();
  }, 1000);

  // 定时器 控制图片自动切换
  function downTime() {
    let item = 5;
    setInterval(() => {
      item++;
      if (item === 5) {
        item = 1;
      }
      console.log(item, 'item');
      document.body.style.backgroundImage = `url(./image/tu${item}.png)`;
      return item;
      // e.stopPropagation(); //取消事件冒泡，这里的e未定义，如果需要正确使用需要在合适的事件处理函数中传入事件对象
    }, 2000);
  }
  window.onload = downTime;