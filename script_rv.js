'use strict'
let str = document.querySelector('.text_main');
let use_str = str.textContent;
let reg = /\B'|'\B/g;
let new_str = use_str.replace(reg, '"');
str.textContent = new_str
