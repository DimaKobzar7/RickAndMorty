// import { Field, Form, Formik, useFormik } from "formik";
import customSelectStyles from "./CustomSelect.module.scss";

import { useEffect } from "react";

// или подстраивать фильтр под карточки или менять контейнеры для всей страницыы
const CustomSelect = () => {
  useEffect(() => {
    // без чекбоксов
    document.querySelectorAll(".dropdown").forEach(function (dropdownWrapper) {
      const dropdownBtn = dropdownWrapper.querySelector(".dropdown__button");
      const dropdownList = dropdownWrapper.querySelector(".dropdown__list");
      const dropdownItems = dropdownList.querySelectorAll(
        ".dropdown__list-item"
      );
      const dropdownInput = dropdownWrapper.querySelector(
        ".dropdown__input_hidden"
      );

      dropdownBtn.addEventListener("click", function () {
        dropdownList.classList.toggle("dropdown__list_visible");
        this.classList.toggle("dropdown__button_active");
      });

      dropdownItems.forEach(function (listItem) {
        listItem.addEventListener("click", function (e) {
          dropdownItems.forEach(function (el) {
            el.classList.remove("dropdown__list-item_active");
          });
          e.target.classList.add("dropdown__list-item_active");
          dropdownBtn.innerText = this.innerText;
          dropdownInput.value = this.dataset.value;
          dropdownList.classList.remove("dropdown__list_visible");
        });
      });

      document.addEventListener("click", function (e) {
        if (e.target !== dropdownBtn) {
          dropdownBtn.classList.remove("dropdown__button_active");
          dropdownList.classList.remove("dropdown__list_visible");
        }
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Tab" || e.key === "Escape") {
          dropdownBtn.classList.remove("dropdown__button_active");
          dropdownList.classList.remove("dropdown__list_visible");
        }
      });
    });

    // с чекбоксами
    document
      .querySelectorAll(".dropdown_with-chk")
      .forEach(function (dropdownWrapper) {
        const dropdownBtn = dropdownWrapper.querySelector(
          ".dropdown_with-chk__button"
        );
        const dropdownList = dropdownWrapper.querySelector(
          ".dropdown_with-chk__list"
        );
        const dropdownItems = dropdownList.querySelectorAll(
          ".dropdown_with-chk__list-item"
        );

        dropdownBtn.addEventListener("click", function () {
          dropdownList.classList.toggle("dropdown_with-chk__list_visible");
          this.classList.toggle("dropdown_with-chk__button_active");
        });

        dropdownItems.forEach(function (listItem) {
          listItem.addEventListener("click", function (e) {
            e.target.classList.toggle("dropdown_with-chk__list-item_active");
          });
        });

        document.addEventListener("click", function (e) {
          if (
            e.target !== dropdownBtn &&
            e.target !== dropdownItems &&
            !e.target.classList.contains("dropdown_with-chk__list-item") &&
            !e.target.classList.contains("dropdown_with-chk__list-item_label")
          ) {
            dropdownBtn.classList.remove("dropdown_with-chk__button_active");
            dropdownList.classList.remove("dropdown_with-chk__list_visible");
          }
        });

        document.addEventListener("keydown", function (e) {
          if (e.key === "Tab" || e.key === "Escape") {
            dropdownBtn.classList.remove("dropdown_with-chk__button_active");
            dropdownList.classList.remove("dropdown_with-chk__list_visible");
          }
        });
      });
  }, []);
  return (
    <div class='container'>
      <h1>Default Dropdown </h1>
      <div class='dropdown'>
        <button class='dropdown__button' type='button'>
          До 100 дней
        </button>
        <ul class='dropdown__list'>
          <li class='dropdown__list-item' data-value='Любой'>
            Любой
          </li>
          <li
            class='dropdown__list-item dropdown__list-item_active'
            data-value='до 100 дней'
          >
            до 100 дней
          </li>
          <li class='dropdown__list-item' data-value='от 100 до 200 дней'>
            от 100 до 200 дней
          </li>
          <li class='dropdown__list-item' data-value='более 200 дней'>
            более 200 дней
          </li>
        </ul>
        <input
          class='dropdown__input_hidden'
          type='text'
          name='select-category'
          value=''
        />
      </div>

      <h1>Dropdown with Checkboxes</h1>
      <div class='dropdown_with-chk'>
        <button class='dropdown_with-chk__button' type='button'>
          Выберите из списка
        </button>
        <ul class='dropdown_with-chk__list'>
          <li class='dropdown_with-chk__list-item'>
            <input
              class='dropdown_with-chk__list-item_label dropdown_with-chk__list-item_active'
              type='checkbox'
              name='i-1'
              id='i-1'
            />
            <label
              class='dropdown_with-chk__list-item_label dropdown_with-chk__list-item_active'
              for='i-1'
            >
              Без справок о доходе
            </label>
          </li>
          <li class='dropdown_with-chk__list-item'>
            <input
              class='dropdown_with-chk__list-item_label dropdown_with-chk__list-item_active'
              type='checkbox'
              name='i-2'
              id='i-2'
            />
            <label
              class='dropdown_with-chk__list-item_label dropdown_with-chk__list-item_active'
              for='i-2'
            >
              Бесплатное снятие наличных
            </label>
          </li>
          <li class='dropdown_with-chk__list-item'>
            <input
              class='dropdown_with-chk__list-item_label'
              type='checkbox'
              name='i-3'
              id='i-3'
            />
            <label class='dropdown_with-chk__list-item_label' for='i-3'>
              С кэшбэком
            </label>
          </li>
          <li class='dropdown_with-chk__list-item'>
            <input
              class='dropdown_with-chk__list-item_label'
              type='checkbox'
              name='i-4'
              id='i-/'
            />
            <label class='dropdown_with-chk__list-item_label' for='i-4'>
              Бесплатное обслуживание
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;

// если будут проблемы то можно пересоздать проект через npx create-react-app my-app --template redux-typescript и react-redux
//json to typescripte generator
