console.clear();
var scrappedData = {};
/**
 * Returns element with given tag name, and property matching expression.
 * @see scrappedData.getChildByTagNameAndProperty
 * @return {object=}
 */
scrappedData.getElementByTagNameAndProperty = function(tagname, property, expression) {
    return scrappedData.getChildByTagNameAndProperty(document, tagname, property, expression);
};
/**
 * Returns element with matching tag name, and property matching expression.
 * @see scrappedData.getChildrenByTagNameAndProperty
 * @return {object=}
 */
scrappedData.getChildByTagNameAndProperty = function(node, tagname, property, expression) {
    var result = scrappedData.getChildrenByTagNameAndProperty(node, tagname, property, expression, 1);
    return result.length == 0 ? null : result[0];
};
/**
 * Returns elements with matching tag name, and property matching expression.
 * @param {object} node
 * @param {string} tagname
 * @param {string} property
 * @param {string} expression
 * @param {int} max_results
 * @return {array}
 */
scrappedData.getChildrenByTagNameAndProperty = function(node, tagname, property, expression, max_results) {
    if (max_results == undefined) {
        max_results = 10000;
    }
    var result = [];
    var elems = node.getElementsByTagName(tagname);
    var regexp = new RegExp(expression);
    for (var i = 0; i < elems.length && result.length < max_results; i++) {
        // In case the attribute is not a property of the element. e.g. date
        if ((regexp.test(elems[i][property]) || regexp.test(elems[i].getAttribute(property))) && !scrappedData.shouldSkipElement(elems[i])) {
            result.push(elems[i]);
        }
    }
    return result;
};
/**
 * Returns deepest element with given tag name, and property matching
 * expression.
 * @see scrappedData.getElementByTagNameAndProperty
 * @return {object=}
 */
scrappedData.getDeepestElementByTagNameAndProperty = function(tagname, property, expression) {
    var result = null;
    var tmp = scrappedData.getElementByTagNameAndProperty(tagname, property, expression);
    while (tmp != null) {
        result = tmp;
        tmp = scrappedData.getChildByTagNameAndProperty(result, tagname, property, expression);
    }
    return result;
};
/**
 * Default value, we do not want to skip invisible elements by default
 */
scrappedData.skipInvisibleElements = false;
/**
 * Returns whether this element should be treated as non-existing in searches.
 * @see scrappedData.isVisible
 * @return {boolean}
 */
scrappedData.shouldSkipElement = function(element) {
    return scrappedData.skipInvisibleElements && !scrappedData.isVisible(element);
};
/**
 * Returns whether element is visible.
 * @param {?object} element
 * @return {boolean}
 */
scrappedData.isVisible = function(element) {
    if (element != null) {
        var style = extension.target.window.getComputedStyle(element);
        return style.display != 'none' && style.visibility != 'hidden' && element.offsetWidth > 0 && element.offsetHeight > 0;
    }
    return false;
};
scrappedData.getTeam = function(tagname, property, expression) {
    var value = scrappedData.getElementByTagNameAndProperty(tagname, property, expression);
    return value.innerText;
}

function getLotteryNo(tagname, property, expression) {
    var parentNode = scrappedData.getElementByTagNameAndProperty(tagname, property, expression);
    console.log(parentNode);
    var lotteryNo = [];
    //     var elem = parentNode.getElementsByTagName(innerTag);
    var elem = parentNode.getElementsByClassName(innerTag);
    //     console.log(elem);
    for (var i in elem) {
        lotteryNo.push(elem[i].innerText);
    }
    return lotteryNo;
};

function getDateAndSeq() {
    var parnetNode = scrappedData.getElementByTagNameAndProperty('div', 'class', 'title-bar clearfix');
    //console.log(baseElement);
    //     var elem = parnetNode.getElementsByTagName('span')[0].innerText;
    var elem = parnetNode.getElementsByTagName('span')[0].innerText;
    date = elem.match(/\((.*?)\)/)[1];
    seq = elem.match(/Concurso\s(\d+)\s/)[1];
    console.log(elem);
    console.log(date + ' ' + seq);
}
// getDateAndSeq();
// scrappedData.innerTag = function(tagname) {
//     return tagname;
// };
// scrappedData.locateElement = function(tagname, property, expression) {
//     this.tagname = tagname;
//     this.property = property;
//     this.expression = expression;
// }
// var megasena = new scrappedData.locateElement('ul', 'class', /numbers\s\w+/);
// var lotofacil = new scrappedData.locateElement('table', 'class', expression);
// // var M= getLotteryNo(megasena.tagname,megasena.property,megasena.expression);
// //console.log(M);
// scrappedData.makeRegexParser = function(regex) {
//     return regex;
// }
// var expression = scrappedData.makeRegexParser(/simple-table\s\w+/);
// var innerTag = scrappedData.innerTag('li');
// var L = getLotteryNo(lotofacil.tagname, lotofacil.property, lotofacil.expression, innerTag);
// console.log(L);
// var lotogol = new scrappedData.locateElement('table','class',/table-d\s.*/);
// var lnlotogol = getLotteryNo(lotogol.tagname,lotogol.property,lotogol.expression);
// console.log(lnlotogol);
function getLotteryNo(tagname, property, expression) {
    var parentNode = scrappedData.getChildrenByTagNameAndProperty(document, tagname, property, expression);
    console.log(parentNode);
    var lotteryNo = [];
    var elem = [];
    for (var j in parentNode) {
        elem.push(parentNode[j].getElementsByTagName(innerTag));
        for (var i = 0; i < elem[j].length; i++) {
            console.log(i);
            lotteryNo.push(elem[j][i].innerText);
        }
    }
    console.log(elem);
    return lotteryNo;
};
//var lnduplasena = getLotteryNo('ul','class','numbers timemania');
// console.log(lnduplasena);
function getWinners(tagname, property, expression) {
    var parentNode = scrappedData.getElementByTagNameAndProperty(tagname, property, expression);
    console.log(parentNode);
};
// var winners = getWinners('div','class','related-box');
/* Syntax:
   array.insert(index, value1, value2, ..., valueN) */
Array.prototype.insert = function(index) {
    this.splice.apply(this, [index, 0].concat(Array.prototype.slice.call(arguments, 1)));
    return this;
};
//---------------------------
function getPrizeData(parseCategory, parseWinners, parseAmount, tagname, proprty, expression) {
    var objectList = [];
    var prizeTable = scrappedData.getElementByTagNameAndProperty(tagname, proprty, expression);
    //var innerElement = prizeTable.childNodes;
    var text = [];
    var html = prizeTable.innerHTML;
    html = html.split(/<\/p>\s+<h3 class="epsilon">/g);
    console.log(html);
    for (var i = 0; i < html.length; i++) {
        var categoryValues = [];
        var winnersValues = [];
        var amountValues = [];
        var prize = {};
        var category = [];
        var winners = [];
        var amount = [];
        //console.log(i);
        var text = html[i];
        //console.log(text);
        if (text.search(/Premiação/) != -1) {
            console.log('success!');
            if (text.search(/1º Sorteio|2º Sorteio/) != -1) {
                prize.winningResultCategory = text.match(/1º Sorteio|2º Sorteio/)[0];
            }
            var tempText = text.split('</p>');
            for (var j = 0; j < tempText.length; j++) {
                console.log(tempText[j]);
                category = setPrizeValue(parseCategory, tempText[j], categoryValues);
                winners = setPrizeValue(parseWinners, tempText[j], winnersValues);
                amount = setPrizeValue(parseAmount, tempText[j], amountValues);
            }
        }
        prize['category'] = category;
        prize['winner'] = winners;
        prize['amount'] = amount;
        objectList.push(prize);
    }
    console.log(objectList);
    return objectList;
}

function setPrizeValue(pattern, arr, values) {
    if (arr.search(pattern) != -1) {
        var match = arr.match(pattern);
        for (var j = 0; j < match.length; j++) {
            values.push(match[j]);
        }
    } else {
        values.push('0');
    }
    values = values.map(function(val){
        return val.replace(/<.*?>|-\s|\s$|\saposta.*|R\$\s|\(/g,'');
    });
    console.log(values);
    return values;
}
/*
calling fucntion from here.
*/
// var parseCategory = /-\s(\d+)\s|<strong>(\d+)\s|\(\d+\s|<td>\d\S<\/td>/g;
// var parseWinners = /(\d+)\saposta/g;
// var parseAmount = /R\$\s*(\d+.*)/g;
// var response = getPrizeData(parseCategory, parseWinners, parseAmount, 'div', 'class', 'related-box');
/*
 *federal condition
 */
function setFederal(tagname, property, expression) {
    var prizeTable = scrappedData.getElementByTagNameAndProperty(tagname, property, expression);
    var innerElement = prizeTable.querySelector('tbody');
    var html = innerElement.getElementsByTagName('tr');
    var categoryValues = [];
    var winnersValues = [];
    var amountValues = [];
    var prize = {};
    var category = [];
    var winners = [];
    var amount = [];
    for (var i = 0; i < html.length; i++) {
        var text = html[i].innerHTML;
        console.log(text);
        category = setPrizeValue(/<td>.*?<\/td>/, text, categoryValues);
        winners = setPrizeValue(/<td>(\d+)<\/td>/g, text, winnersValues);
        amount = setPrizeValue(/<td>\d+\..*?<\/td>/, text, amountValues);
    }
    prize['category'] = category;
    prize['winner'] = winners;
    prize['amount'] = amount;
    console.log(prize);
    return prize;
}
/*
calling setFederal.
 */
//var response = setFederal('table', 'class', 'simple-table');


var parseCategory = /-\s(\d+)\s|<strong>(\d+)\s|\(\d+\s|<td>\d\S<\/td>/g;
var parseWinners = /(\d+)\saposta/g;
var parseAmount = /R\$\s*(\d+.*)/g;


function getPrizeValues (parseCategory,parseWinners,parseAmount){
    var response = getPrizeData(parseCategory, parseWinners, parseAmount, 'div', 'class', 'related-box');
    response = response.filter(function(val){
        return val['category'].length > 1;
    });
    for (var i = 0 ; i<response.length;i++){
        console.log(response[i]);
        var winningResultCategory = response[i].winningResultCategory;
        var prizeCategory = response[0].category;
        var prizeWinners = response[0].winner;
        var prizeAmount = response[0].amount;
        console.log(winningResultCategory,prizeCategory,prizeWinners,prizeAmount);
        //return [winningResultCategory,prizeCategory,prizeWinners,prizeAmount];
      }
}

getPrizeValues(parseCategory,parseWinners,parseAmount);
