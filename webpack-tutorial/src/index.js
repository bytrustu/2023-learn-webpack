import { join } from 'lodash';

function component() {
    var element = document.createElement('div');
    element.innerHTML = join(['Hello', 'webpack'], ' ');
    return element;
}

document.body.appendChild(component());
