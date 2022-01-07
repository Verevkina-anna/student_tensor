class Api {
   constructor(url, headers) {
      this._url = url;
      this._headers = headers;
   }

   getItems() {
      return fetch(this._url, {
         method: 'GET',
         headers: this._headers
      }).then((res) => {
         return this._processResult(res, 'Ошибка при получении данных');
      });
   }

   deleteItem(id) {
      return fetch(`${this._url}/${id}`, {
         method: 'DELETE',
         headers: this._headers
      }).then((res) => {
         return this._processResult(res, 'Ошибка при удалении записи');
      });
   }

   createItem(data) {
      return fetch(`${this._url}/`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify(data)
      }).then((res) => {
         return this._processResult(res, 'Ошибка при добавлении записи');
      });
   }

   updateItem(id, data) {
      return fetch(`${this._url}/${id}`, {
         method: 'PUT',
         headers: this._headers,
         body: JSON.stringify(data)
      }).then((res) => {
         return this._processResult(res, 'Ошибка при изменении записи');
      });
   }

   _processResult(res, errorText) {
      if (res.ok) {
         return res.json();
      }
      alert(errorText);
      return Promise.reject(errorText);
   }
}

class Form {
   constructor(element) {
      this._element = element;
   }

   init(submitHandler, values) {
      this.closeForm();
      this._submitHandler = submitHandler;
      this._element.addEventListener('submit', this._submitHandler);

      if (values) {
         Object.keys(values).forEach((name) => {
            this._element.querySelector(`[name=${name}]`).value = values[name];
         });
      }
   }

   closeForm() {
      this._element.reset();
      this._element.removeEventListener('submit', this._submitHandler);
      this._submitHandler = null;
   }
}

const $studentsSection = document.querySelector('.students');
const $studentTemplate = document.querySelector('#studentTemplate').content;
const $popup = document.querySelector('#studentPopup');
const $studentButton = document.querySelector('.header_logo');
const $popupCloseButton = document.querySelector('.popup_close');
const studentApi = new Api('http://localhost:3000/students', { 'Content-Type': 'application/json' });
const studentForm = new Form(document.querySelector('.student-form'));

const showPopup = () => {
   $popup.classList.add('opened');
}

const hidePopup = () => {
   $popup.classList.remove('opened');
   studentForm.closeForm();
}

const renderList = (data) => {
   $studentsSection.innerHTML = '';
   data.forEach(renderItem)
};

const renderItem = (item) => {
   const $studentEl = $studentTemplate.cloneNode(true);
   const $studentImg = $studentEl.querySelector('.avatar_url');
   const $buttonDelete = $studentEl.querySelector('.button_delete');
   const $buttonEdit = $studentEl.querySelector('.button_edit');

   $studentEl.querySelector('.student_name').textContent = item.name;
   $studentEl.querySelector('.student_university').textContent = item.university;
    $studentEl.querySelector('.student_course').textContent=item.course+" курс ";
   $studentEl.querySelector('.student_city').textContent=" г. "+item.city;
   $studentImg.setAttribute('src', item.avatar_url);
   $studentImg.setAttribute('alt', item.name);

   $studentsSection.appendChild($studentEl);

   $buttonDelete.addEventListener('click', (event) => {
      event.preventDefault();

      studentApi.deleteItem(item.id).then(() => {
         event.target.closest('.student')?.remove?.();
      });
   });

   $buttonEdit.addEventListener('click', (event) => {
      showPopup();
      studentForm.init((event) => {
         event.preventDefault();
         const data = {
            id: item.id,
            name: event.target.elements[0].value,
            university: event.target.elements[1].value,
            course: event.target.elements[2].value,
            //course: item.course,
            city: event.target.elements[3].value,
            avatar_url: event.target.elements[4].value
         };

         studentApi.updateItem(item.id, data).then(() => {
            studentApi.getItems().then((data) => renderList(data));
            hidePopup();
         });
      }, {
         name: item.name,
         university: item.university,
         course: item.course,
         city: item.city,
         avatar_url: item.avatar_url
      });
   });
}


studentApi.getItems().then((data) => renderList(data));

$studentButton.addEventListener('click', () => {
   showPopup();
   studentForm.init((event) => {
      event.preventDefault();
      const data = {
         name: event.target.elements[0].value,
         university: event.target.elements[1].value,
         course:event.target.elements[2].value,
         //course: item.course,
         city: event.target.elements[3].value,
         avatar_url: event.target.elements[4].value,
      };

      studentApi.createItem(data).then(() => {
         studentApi.getItems().then((data) => renderList(data));
         hidePopup();
      });
   });
});

$popupCloseButton.addEventListener('click', () => {
   hidePopup();
});


// class Api {
//    constructor(url, headers) {
//       this._url = url;
//       this._headers = headers;
//    }

//    getItems() {
//       return fetch(this._url, {
//          method: 'GET',
//          headers: this._headers
//       }).then((res) => {
//          return this._processResult(res, 'Ошибка при получении данных');
//       });
//    }
//    getItem(id) {
//       return fetch(`${this._url}/${id}`, {
//          method: 'GET',
//          headers: this._headers,
//       }).then((res) => {
//          return this._processResult(res, 'Ошибка при получении данных');
//       });
//    }

//    deleteItem(id) {
//       return fetch(`${this._url}/${id}`, {
//          method: 'DELETE',
//          headers: this._headers
//       }).then((res) => {
//          return this._processResult(res, 'Ошибка при удалении записи');
//       });
//    }

//    createItem(data) {
//       return fetch(`${this._url}/`, {
//          method: 'POST',
//          headers: this._headers,
//          body: JSON.stringify(data)
//       }).then((res) => {
//          return this._processResult(res, 'Ошибка при добавлении записи');
//       });
//    }

//    updateItem(id, data) {
//       return fetch(`${this._url}/${id}`, {
//          method: 'PUT',
//          headers: this._headers,
//          body: JSON.stringify(data)
//       }).then((res) => {
//          return this._processResult(res, 'Ошибка при изменении записи');
//       });
//    }

//    _processResult(res, errorText) {
//       if (res.ok) {
//          return res.json();
//       }
//       alert(errorText);
//       return Promise.reject(errorText);
//    }
// }

// class Form {
//    constructor(element) {
//       this._element = element;
//    }

//    init(submitHandler, values) {
//       this.closeForm();
//       this._submitHandler = submitHandler;
//       this._element.addEventListener('submit', this._submitHandler);

//       if (values) {
//          Object.keys(values).forEach((name) => {
//             this._element.querySelector(`[name=${name}]`).value = values[name];
//          });
//       }
//    }

//    closeForm() {
//       this._element.reset();
//       this._element.removeEventListener('submit', this._submitHandler);
//       this._submitHandler = null;
//    }
// }

// const $studentsSection = document.querySelector('.students');
// const $studentTemplate = document.querySelector('#studentTemplate').content;

// const $popup = document.querySelector('#studentPopup');
// const $studentButton = document.querySelector('.header_logo');

// // const $card = document.querySelector('#studentCard');
// // const $cardButton = document.querySelector('.student');

// const $popupCloseButton = document.querySelector('.popup_close');
// const studentApi = new Api('http://localhost:3000/students', { 'Content-Type': 'application/json' });
// const studentForm = new Form(document.querySelector('.student-form'));

// // const showStudentCard = () => {
// //    $card.classList.add('opened');
// // }

// const showPopup = () => {
//    $popup.classList.add('opened');
// }

// const hidePopup = () => {
//    $popup.classList.remove('opened');
//    studentForm.closeForm();
// }
// // const hideStudentCard = () => {
// //    $card.classList.remove('opened');
// //    $card.closeForm();
// // }

// const renderList = (data) => {
//    $studentsSection.innerHTML = '';
//    data.forEach(renderItem)
// };
// // const renderCard = (data) => {
// //    $studentsSection.innerHTML = '';
// //    data.forEach(renderStudent)
// // };

// const renderItem = (item) => {
//    const $studentEl = $studentTemplate.cloneNode(true);
//    const $studentImg = $studentEl.querySelector('.avatar_url');
//    const $buttonDelete = $studentEl.querySelector('.button_delete');
//    const $buttonEdit = $studentEl.querySelector('.button_edit');
//    $studentEl.querySelector('.student_name').textContent = item.name;
//    $studentEl.querySelector('.student_university').textContent = item.university;
//    $studentEl.querySelector('.student_course').textContent=item.course;
//    $studentEl.querySelector('.student_city').textContent=item.city;
//    $studentImg.setAttribute('src', item.avatar_url);
//    $studentImg.setAttribute('alt', item.name);
//    // const $studentCard= $card.content.cloneNode(true);
//    // const $cardImg = $card.content.querySelector('.avatar_url');
//    // $studentCard.querySelector('.student_name').textContent = item.name;
//    // $studentCard.querySelector('.student_university').textContent = item.university;
//    // $studentCard.querySelector('.student_course').textContent=item.course;
//    // $studentCard.querySelector('.student_city').textContent=item.city;
//    // $cardImg.setAttribute('src', item.avatar_url);
//    // $cardImg.setAttribute('alt', item.name);

//    // $cardButton.addEventListener('click', (event) => {
//    //    showStudentCard();
//    //       event.preventDefault();
//    //       const data = {
//    //          id: item.id,
//    //          name: event.target.elements[0].value,
//    //          university:event.target.elements[1].value,
//    //          course: event.target.elements[2].value,
//    //          city: event.target.elements[3].value,
//    //          avatar_url: event.target.elements[4].value
//    //       };

//    //       studentApi.getItem(item.id).then(() => {
//    //          hideStudentCard();
//    //       });
//    //    });
   

//    $studentsSection.appendChild($studentEl);

//    $buttonDelete.addEventListener('click', (event) => {
//       event.preventDefault();

//       studentApi.deleteItem(item.id).then(() => {
//          event.target.closest('.student')?.remove?.();
//       });
//    });

//    $buttonEdit.addEventListener('click', (event) => {
//       showPopup();
//       studentForm.init((event) => {
//          event.preventDefault();
//          const data = {
//             id: item.id,
//             name: event.target.elements[0].value,
//             university:event.target.elements[1].value,
//             course: event.target.elements[2].value,
//             city: event.target.elements[3].value,
//             avatar_url: event.target.elements[4].value
//          };

//          studentApi.updateItem(item.id, data).then(() => {
//             studentApi.getItems().then((data) => renderList(data));
//             hidePopup();
//          });
//       }, {
//          name: item.name,
//          university: item.university,
//          course:item.course,
//          city: item.city,
//          avatar_url: item.avatar_url
//       });
//    });
// }

//    studentApi.getItems().then((data) => renderList(data));

//    studentApi.createItem(data).then(() => {
//       studentApi.getItems().then((data) => renderList(data));
//       hidePopup();
//    });
  


//    $popupCloseButton.addEventListener('click', () => {
//       hidePopup();
//    });

