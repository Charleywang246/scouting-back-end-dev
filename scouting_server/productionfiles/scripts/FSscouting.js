function addCheckbox (config) {
    const rightbox = document.createElement("div");
    rightbox.setAttribute("class", "rightbox checkbox");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.id = config.id;
    rightbox.appendChild(checkbox);
    return rightbox;
}

function addCounter (config) {
    const rightbox = document.createElement("div");
    rightbox.setAttribute("class", "rightbox counter");
    rightbox.setAttribute("style", "display:flex; flex_direction: row");
    const minusBotton = document.createElement("p");
    minusBotton.innerText = "-";
    minusBotton.setAttribute("class", "counter_button");
    minusBotton.addEventListener("click", minus(config.id));
    const valueBox = document.createElement("input");
    valueBox.setAttribute("type", "text");
    valueBox.id = config.id;
    valueBox.value = config.default_value;
    const plusBotton = document.createElement("p");
    plusBotton.innerText = "+";
    plusBotton.setAttribute("class", "counter_button");
    plusBotton.addEventListener("click", plus(config.id))
    rightbox.appendChild(minusBotton);
    rightbox.appendChild(valueBox);
    rightbox.appendChild(plusBotton);
    return rightbox;
}

function addRadio (config) {
    const rightbox = document.createElement("div");
    rightbox.setAttribute("class", "rightbox radio");
    for (let key in config.choices) {
        const radio = document.createElement("input");
        radio.setAttribute("name", config.id);
        radio.value = key;
        radio.setAttribute("type", "radio");
        if (key == config.default_value) radio.checked = true;
        rightbox.appendChild(radio);
        rightbox.append(config.choices[key]);
        rightbox.append(document.createElement("br"));
    };
    return rightbox;
}

function addText (config) {
    const rightBox = document.createElement("div");
    rightBox.setAttribute("class", "rightbox text");
    const textBox = document.createElement("input");
    textBox.setAttribute("type", "text");
    textBox.id = config.id;
    textBox.value = config.default_value;
    rightBox.appendChild(textBox);
    return rightBox;
}

function addTextarea (config) {
    const rightBox = document.createElement("div");
    rightBox.setAttribute("class", "rightbox textarea");
    const textarea = document.createElement("textarea");
    textarea.id = config.id;
    rightBox.appendChild(textarea);
    return rightBox;
}

function addElement (target, config) {
    config.forEach(configuration => {
        const box = document.createElement("div");
        box.setAttribute("class", "box");
        const leftBox = document.createElement("div");
        leftBox.setAttribute("class", "leftBox");
        const text = document.createElement("p");
        text.innerHTML = configuration.text;
        leftBox.appendChild(text);

        box.appendChild(leftBox);

        if (configuration.type == "checkbox") box.appendChild(addCheckbox(configuration));
        else if (configuration.type == "counter") box.appendChild(addCounter(configuration));
        else if (configuration.type == "radio") box.appendChild(addRadio(configuration));
        else if (configuration.type == "text") box.appendChild(addText(configuration));
        else if (configuration.type == "textarea") box.appendChild(addTextarea(configuration));        
        else console.error("can't found type of " + configuration.type);

        target.appendChild(box);
    });
}

function last_page () {
    let current_page = document.getElementById("current_page").innerText;
    pages = ["prematch", "auto", "teleop", "endgame", "result"];
    index = pages.indexof(current_page);
    document.getElementById(pages[index]).setAttribute("style", "display: none;");
    document.getElementById(pages[index-1]).setAttribute("style", "");
    document.getElementById("current_page").innerText = pages[index-1];
}

function next_page () {
    if (!verify()) return;
    let current_page = document.getElementById("current_page").innerText;
    pages = ["prematch", "auto", "teleop", "endgame", "result"];
    index = pages.indexof(current_page);
    current_page = document.getElementById("not_participated").checked ? pages[4] : pages[index+1];
    document.getElementById(pages[index]).setAttribute("style", "display: none;");
    document.getElementById(pages[index+1]).setAttribute("style", "");
    document.getElementById("current_page").innerText = pages[index-1];
}

function verify () {
    for (const part in config[current_page]) {
        type = config[current_page][part].type
        if (type == "text" && document.getElementById(config[current_page][part].id).value == "") {
            alert(config[current_page][part].text + "不可空白"); return false;
        }
        if (type == "radio" && document.querySelector("[name='" + config[current_page][part].id + "']:checked") == null) {
            alert(config[current_page][part].text + "不可空白"); return false;
        }
    }
    return true
}

// change counter input
function minus (id) {
    const e = document.getElementById(id);
    e.value = Number(e.value) - 1;
}

function plus (id) {
    const e = document.getElementById(id);
    e.value = Number(e.value) + 1;
}

// upload data to server
function postData() {
    var form = document.getElementById("form");
    for (const section in config) {
        for (const part in config[section]) {
            var e = document.createElement("input");
            e.type = "hidden";
            e.name = config[section][part].id;
            switch (config[section][part].type) {
                case "text":
                case "textarea":
                case "counter":
                    e.value = document.getElementById(config[section][part].id).value;
                    break;
                case "radio":
                    e.value = document.querySelector("[name='" + config[section][part].id + "']:checked").value;
                    break;
                case "checkbox":
                    e.value = document.getElementById(config[section][part].id).checked == 1 ? "True" : "False";
                    break;
            }
            form.appendChild(e.cloneNode());
        }
    }
    document.getElementById("result").appendChild(form);
    form.submit();
}

document.addEventListener("DOMContentLoaded", () => {
    const config = JSON.parse(game_config);
    document.getElementById("game_name").innerText = "Crescendo";

    const next_button = document.createElement("button");
    next_button.setAttribute("type", "button");
    next_button.addEventListener("click", next_page)
    next_button.innerText = "Nex";

    const back_button = document.createElement("button");
    back_button.setAttribute("type", "button");
    back_button.addEventListener("click", last_page);
    back_button.innerText = "Back";

    const post_button = document.createElement("button");
    post_button.setAttribute("type", "button");
    post_button.addEventListener("click", postData)
    post_button.innerText = "upload data";

    for (let tag in config) {
        const e = document.getElementById(tag);
        const title = document.createElement("p");
        title.innerText = tag;
        const button_set = document.createElement("div");
        button_set.setAttribute("class", "page_button");
        if (tag != "prematch" && tag != "result")  {
            button_set.appendChild(back_button.cloneNode(true));
            button_set.appendChild(next_button.cloneNode(true));
        }
        if (tag == "prematch") button_set.appendChild(next_button.cloneNode(true));
        if (tag == "result") {
            button_set.appendChild(post_button.cloneNode(true));
        }
        e.appendChild(title);
        addElement(e, config[tag]);
        e.appendChild(button_set.cloneNode(true));
    }
});