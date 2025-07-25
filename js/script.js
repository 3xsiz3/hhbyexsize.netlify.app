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

  document.querySelectorAll('.buttom_view_more').forEach(button => {
  button.addEventListener('click', function() {
    this.classList.add('hidden');
  });
  });

  document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.list_case');
  const horizontalCases = document.querySelectorAll('.horisontal_cases');
  const showMoreBtn = document.querySelector('.buttom_view_more');
  const lastCaseIndex = horizontalCases.length - 1;
  
  // Флаг для отслеживания состояния кнопки
  let isAllCasesShown = false;
  
  // Скрываем последний блок по умолчанию
  horizontalCases[lastCaseIndex].style.display = 'none';
  
  // Обработчик для кнопки "Показать еще"
  showMoreBtn.addEventListener('click', function() {
    horizontalCases[lastCaseIndex].style.display = 'flex';
    this.classList.add('hidden');
    isAllCasesShown = true; // Запоминаем, что все карточки показаны
  });
  
  // Обработчики для кнопок фильтрации
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Сброс активных кнопок
      document.querySelectorAll('.list_case').forEach(btn => {
        btn.classList.remove('list_case_active');
      });
      this.classList.add('list_case_active');
      
      const filter = this.textContent.trim();
      
      // Сначала скрываем все блоки
      horizontalCases.forEach(container => {
        container.style.display = 'none';
      });
      
      // Показываем нужные блоки
      if (filter === 'Все работы') {
        // Показываем все блоки, если кнопка была нажата
        if (isAllCasesShown) {
          horizontalCases.forEach(container => {
            container.style.display = 'flex';
          });
          showMoreBtn.classList.add('hidden');
        } else {
          // Иначе показываем все кроме последнего
          for (let i = 0; i < lastCaseIndex; i++) {
            horizontalCases[i].style.display = 'flex';
          }
          showMoreBtn.classList.remove('hidden');
        }
      }
      else if (filter === 'Внедрение') {
        horizontalCases[0].style.display = 'flex';
        showMoreBtn.classList.add('hidden');
      }
      else if (filter === 'Сопровождение') {
        horizontalCases[1].style.display = 'flex';
        showMoreBtn.classList.add('hidden');
      }
      // Для "Обучение" ничего не показываем
    });
  });
  
  // Активируем кнопку "Все работы" по умолчанию
  document.querySelector('.list_case_active').click();
});