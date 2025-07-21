const ticker = document.getElementById('ticker');
  const text = ticker.innerHTML;

  while (ticker.scrollWidth < window.innerWidth * 2) {
    ticker.innerHTML += text;
  }

  let offset = 0;

  function animate() {
    offset -= 1;
    ticker.style.transform = `translateX(${offset}px)`;
    if (Math.abs(offset) >= ticker.scrollWidth / 2) {
      offset = 0;
    }

    requestAnimationFrame(animate);
  }

  animate();

document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.js-we-can-item');
    const hoverAreas = document.querySelectorAll('.js-hr-hover');
    
    activateItem(items[0]);
    
    items.forEach(item => {
        item.addEventListener('click', function() {
            activateItem(this);
        });
    });
    
    hoverAreas.forEach(area => {
        area.addEventListener('click', function() {
            const item = this.parentElement.previousElementSibling;
            if (item && item.classList.contains('js-we-can-item')) {
                activateItem(item);
            }
        });
    });
    
    function activateItem(activeItem) {
        items.forEach(item => {
            item.classList.remove('active');
        });

        activeItem.classList.add('active');
    }
});

document.querySelectorAll('.list_case').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.list_case').forEach(btn => {
        btn.classList.remove('list_case_active');
      });
      
      this.classList.add('list_case_active');
    });
  });
