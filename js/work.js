/**
 * @file:work.js
 * @description: the steps of complier
 */

// var
var lA, tS;

// my alert
function sAlert(e) {
    var d = document.createElement('div');
    d.classList.add('alert-mask');
    d.id = 'alert-mask';
    d.innerHTML = `<div class="alert-main">\
        <div class="alert-head">ERROR</div>\
        <div class="alert-content">${e}</div>\
        <div class="alert-ok">\
            <button class="s-button s-fl" onclick = "sAlertOk()">OK</button>\
            <button class="s-button s-blue s-fr" onclick = "sReset()">Reset</button>\
            <div class="s-clear"></div>\
        </div>\
    </div>`;
    document.getElementById('main').appendChild(d);
}
function sAlertOk(){
    document.getElementById('alert-mask').remove();
}

function sReset(){
    document.getElementById('alert-mask').remove();
    document.getElementById('s1-split').style.display = 'none';
    document.getElementById('s2-lexical').style.display = 'none';
    document.getElementById('source-code').value = '';
    updateS1Button();
}

function updateS1Button(){
    document.getElementById('s1-submit').disabled = (document.getElementById('source-code').value == '');
}

// step1 upload the file
function uploadSource() {
    var r = new FileReader();
    var f = document.getElementById('s1-upload');
    if (f.files.length === 0) {
        sAlert('No File!');
        return;
    }
    r.onload = function () {
        document.getElementById('source-code').value = r.result;
        updateS1Button();
    }
    r.readAsText(f.files[0]);
    f.value = '';
}

// step2 lexical analysis and display the result
function lexicalResultDisplay() {
    lA = new LexicalAnalysis(document.getElementById('source-code').value);
    try {
        lA.analysisTokenStream();
        tS = lA.tokenStream;
    } catch (e) {
        sAlert(e);
        return;
    }
    document.getElementById('s1-split').style.display = 'block';
    document.getElementById('s2-lexical').style.display = 'block';
    document.getElementById('lexical-table').innerHTML = '';
    var t = '<tr>\
                <th>Type</th>\
                <th>Value</th>\
                <th>Row</th>\
                <th>Col</th>\
            </tr>';
    for(let i = 0; i < tS.length; i ++){
        t += `<tr><td>${tS[i].token}</td><td>${tS[i].value}</td><td>${tS[i].position.row}</td>\
            <td>${tS[i].position.row}</td></tr>`;
    }
    document.getElementById('lexical-table').innerHTML = t;
}
