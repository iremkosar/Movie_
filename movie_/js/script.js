document.addEventListener('DOMContentLoaded', function() {
    const btnLogin = document.querySelector('.btn-login');
    
    // Kullanıcı adı ve şifreyi Local Storage'a kaydet
    localStorage.setItem('username', 'iremkosar');
    localStorage.setItem('password', 'uibeelabs');

    btnLogin.addEventListener('click', async function() {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        const usernameInput = document.querySelector('.two-input[name="username"]');
        const passwordInput = document.querySelector('.two-input[name="password"]');
        
        if (usernameInput.value === username && passwordInput.value === password) {
            const url = './top_rated.html';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '47751142damsh49a735a0ef5a185p1f08afjsn13716bb0e823',
                    'X-RapidAPI-Host': './top_rated.html'
                }
            };
            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
                window.location.href = url;
            } catch (error) {
                console.error(error);
            }
        } 
        else {
            alert('Kullanıcı adı ve şifrenizi doğru giriniz !');
        }
    });
});







   var toggleButton = document.getElementById('check');

document.addEventListener("DOMContentLoaded", function() {
 

    toggleButton.addEventListener('click', function() {
        if (toggleButton.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        // İlgili diğer bileşenlerin arka plan rengini de dark mode'a göre ayarlayabilirsiniz
        // Örneğin:
        // document.querySelector('.sidebar').classList.add('dark-mode');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        // İlgili diğer bileşenlerin arka plan rengini de light mode'a göre ayarlayabilirsiniz
        // Örneğin:
        // document.querySelector('.sidebar').classList.remove('dark-mode');
    }
});


//        var swiper = new Swiper(".MySwiper", {
//      slidesPerView: 4,
//      spaceBetween: 0,
//      slidesPerGroup: 4,
//      loop: true,
//      grabCursor: true,
//      loopFillGroupWithBlank: true,
//      navigation: {
//        nextEl: ".swiper-button-next-other",
//        clickable: true,
//      },
//  });

 
   var swiper = new Swiper(".mySwiper", {
     slidesPerView: 4,
     spaceBetween: 0,
     slidesPerGroup: 4,
     loop: true,
     grabCursor: true,
    loopFillGroupWithBlank: true,
     navigation: {
       nextEl: ".swiper-button-next",
       clickable: true,
     },
 });


 var swiper1 = new Swiper(".mySwiper1", {
    slidesPerView: 3,
    spaceBetween: 0,
    slidesPerGroup: 3,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      clickable: true,
    },
  });


  



  // var swiper = new Swiper('.myswiper_', {
  //   slidesPerView: 3,
  //   slidesPerGroup: 3,
  //   loop: true,
  //   grabCursor: true,
  //   loopFillGroupWithBlank: true,
  //   pagination: {
  //     nextEl: '.swiper-button-next-other_',
  //     clickable: true,
  //   },
  // });




  document.getElementById('toggleButton').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('dark-mode', this.checked);
  const loginPage = document.querySelector('.login-page-two');
  loginPage.classList.toggle('dark-mode', this.checked);
  const header = document.querySelector('.rated-header .container');
  header.classList.toggle('dark-mode', this.checked);


 
  });


  function applyTheme(theme) {
    const logo = document.getElementById('header-logo');
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      logo.src = 'img/notification_dark.png'; // Dark mode için logo
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      logo.src = 'img/notification_light.png'; // Aydınlık mod için logo
      
    }
  }
