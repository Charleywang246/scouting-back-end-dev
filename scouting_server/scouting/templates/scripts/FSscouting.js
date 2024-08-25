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
    minusBotton.setAttribute("onclick", "minus('" + config.id + "');");
    const valueBox = document.createElement("input");
    valueBox.setAttribute("type", "text");
    valueBox.id = config.id;
    valueBox.value = config.default_value;
    const plusBotton = document.createElement("p");
    plusBotton.innerText = "+";
    plusBotton.setAttribute("class", "counter_button");
    plusBotton.setAttribute("onclick", "plus('" + config.id + "');");
    rightbox.appendChild(minusBotton);
    rightbox.appendChild(valueBox);
    rightbox.appendChild(plusBotton);
    return rightbox;
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

        switch (configuration.type) {
            case "text":
                box.appendChild(addText(configuration));
                break;
            case "textarea":
                box.appendChild(addTextarea(configuration));
                break;
            case "radio":
                box.appendChild(addRadio(configuration));
                break;
            case "checkbox":
                box.appendChild(addCheckbox(configuration));
                break;
            case "counter":
                box.appendChild(addCounter(configuration));
                break;
            default:
                console.error("can't found type of " + configuration.type);
        }

        target.appendChild(box);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const config = JSON.parse(game_config);
    document.getElementById("game_name").innerText = "Crescendo";

    const next_button = document.createElement("button");
    next_button.setAttribute("type", "button");
    next_button.setAttribute("onclick", "next_page();");
    next_button.innerText = "Next";

    const back_button = document.createElement("button");
    back_button.setAttribute("type", "button");
    back_button.setAttribute("onclick", "last_page();");
    back_button.innerText = "Back";

    const reset_button = document.createElement("button");
    reset_button.setAttribute("type", "button");
    reset_button.setAttribute("onclick", "next_page();");
    reset_button.innerText = "Reset";

    const copy_button = document.createElement("button");
    copy_button.setAttribute("type", "button");
    copy_button.setAttribute("onclick", "uploadData();");
    copy_button.innerText = "upload data";

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
            button_set.appendChild(reset_button.cloneNode(true));
            button_set.appendChild(copy_button.cloneNode(true));
        }
        e.appendChild(title);
        addElement(e, config[tag]);
        e.appendChild(button_set.cloneNode(true));
    }
});