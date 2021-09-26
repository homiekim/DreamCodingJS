'use strict'
const CARROT_SIZE = 80;
import * as sound from './sound.js';
export default class Field {

    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRec = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }

    init(){
        this.field.innerHTML = '';
        this._addItem('carrot', this.carrotCount, 'img/carrot.png')
        this._addItem('bug', this.bugCount, 'img/bug.png')
    }

    _addItem(className, count, imgPath){
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRec.width - CARROT_SIZE;
        const y2 = this.fieldRec.height- CARROT_SIZE;
        for(let i = 0; i < count;i++){
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNum(x1, x2);
            const y = randomNum(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    setClickListener(onFieldClick){
        this.onFieldClick = onFieldClick;
    }

    onClick = (event)=>{
        const target =event.target;
    if(target.matches('.carrot')){
        target.remove();
        sound.palyCarrot();
        this.onFieldClick && this.onFieldClick('carrot');
    }else if(target.matches('.bug')){
        this.onFieldClick && this.onFieldClick('bug');
    }
    }

}

function randomNum(min, max){
    return Math.random() * (max-min) +min;
}
