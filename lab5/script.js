class Card {
    #id;
    #name;
    #description;
    #cost;
    #rarity;
    #effect;
    #preset;

    constructor(id, name, description, cost, rarity, effect, preset = true) {
        this.#id = id;
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.rarity = rarity;
        this.effect = effect;
        this.#preset = preset;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get description() { return this.#description; }
    get cost() { return this.#cost; }
    get rarity() { return this.#rarity; }
    get effect() { return this.#effect; }
    get preset() { return this.#preset; }

    set name(value) {
        value = String(value).trim();
        if (value.length < 2) throw new Error("Название слишком короткое.");
        this.#name = value;
    }

    set description(value) {
        value = String(value).trim();
        if (value.length < 5) throw new Error("Описание слишком короткое.");
        this.#description = value;
    }

    set cost(value) {
        value = Number(value);
        if (!Number.isInteger(value) || value < 0 || value > 20) throw new Error("Стоимость от 0 до 20.");
        this.#cost = value;
    }

    set rarity(value) {
        value = String(value).trim();
        if (!value) throw new Error("Укажите редкость.");
        this.#rarity = value;
    }

    set effect(value) {
        value = String(value).trim();
        if (value.length < 5) throw new Error("Эффект слишком короткий.");
        this.#effect = value;
    }

    getType() {
        return "Обычная карта";
    }

    getClassName() {
        return "custom";
    }

    getExtra() {
        return [];
    }

    update(data) {
        this.name = data.name;
        this.description = data.description;
        this.cost = data.cost;
        this.rarity = data.rarity;
        this.effect = data.effect;
    }

    toJSON() {
        return {
            classType: this.constructor.name,
            id: this.id,
            name: this.name,
            description: this.description,
            cost: this.cost,
            rarity: this.rarity,
            effect: this.effect,
            preset: this.preset
        };
    }

    render(editMode = false) {
        const article = document.createElement("article");
        article.className = `card-item ${this.getClassName()}`;

        article.innerHTML = `
            <div class="card-top">
                <h3 class="card-title">${this.name}</h3>
                <span class="card-badge">${this.getType()}</span>
            </div>
            <div class="card-meta">
                <span class="card-stat">Мана: ${this.cost}</span>
                <span class="card-stat">Редкость: ${this.rarity}</span>
                ${this.getExtra().map(item => `<span class="card-stat">${item}</span>`).join("")}
            </div>
            <p class="card-description">${this.description}</p>
            <p class="card-effect">${this.effect}</p>
            <div class="card-footer">
                <div class="card-actions"></div>
            </div>
        `;

        const actions = article.querySelector(".card-actions");

        if (!this.preset) {
            const del = document.createElement("button");
            del.className = "button danger";
            del.type = "button";
            del.textContent = "Удалить";
            del.onclick = () => deleteCustomCard(this.id);
            actions.append(del);
        }

        if (editMode && this.preset) {
            article.append(createEditPanel(this));
        }

        return article;
    }
}

class CarryCard extends Card {
    #damage;
    #skill;

    constructor(id, name, description, cost, rarity, effect, damage, skill, preset = true) {
        super(id, name, description, cost, rarity, effect, preset);
        this.damage = damage;
        this.skill = skill;
    }

    get damage() { return this.#damage; }
    get skill() { return this.#skill; }

    set damage(value) {
        value = Number(value);
        if (!Number.isInteger(value) || value < 1 || value > 100) throw new Error("Урон от 1 до 100.");
        this.#damage = value;
    }

    set skill(value) {
        value = String(value).trim();
        if (!value) throw new Error("Укажите способность.");
        this.#skill = value;
    }

    getType() { return "Керри"; }
    getClassName() { return "carry"; }
    getExtra() { return [`Урон: ${this.damage}`, `Ультимейт: ${this.skill}`]; }

    update(data) {
        super.update(data);
        this.damage = data.damage;
        this.skill = data.skill;
    }

    toJSON() {
        return { ...super.toJSON(), damage: this.damage, skill: this.skill };
    }
}

class SupportCard extends Card {
    #supportPower;
    #item;

    constructor(id, name, description, cost, rarity, effect, supportPower, item, preset = true) {
        super(id, name, description, cost, rarity, effect, preset);
        this.supportPower = supportPower;
        this.item = item;
    }

    get supportPower() { return this.#supportPower; }
    get item() { return this.#item; }

    set supportPower(value) {
        value = Number(value);
        if (!Number.isInteger(value) || value < 1 || value > 100) throw new Error("Поддержка от 1 до 100.");
        this.#supportPower = value;
    }

    set item(value) {
        value = String(value).trim();
        if (!value) throw new Error("Укажите Ультимейт.");
        this.#item = value;
    }

    getType() { return "Саппорт"; }
    getClassName() { return "support"; }
    getExtra() { return [`Поддержка: ${this.supportPower}`, `Ультимейт: ${this.item}`]; }

    update(data) {
        super.update(data);
        this.supportPower = data.supportPower;
        this.item = data.item;
    }

    toJSON() {
        return { ...super.toJSON(), supportPower: this.supportPower, item: this.item };
    }
}

class InitiatorCard extends Card {
    #control;
    #ultimate;

    constructor(id, name, description, cost, rarity, effect, control, ultimate, preset = true) {
        super(id, name, description, cost, rarity, effect, preset);
        this.control = control;
        this.ultimate = ultimate;
    }

    get control() { return this.#control; }
    get ultimate() { return this.#ultimate; }

    set control(value) {
        value = Number(value);
        if (!Number.isInteger(value) || value < 1 || value > 100) throw new Error("Контроль от 1 до 100.");
        this.#control = value;
    }

    set ultimate(value) {
        value = String(value).trim();
        if (!value) throw new Error("Укажите ультимейт.");
        this.#ultimate = value;
    }

    getType() { return "Инициатор"; }
    getClassName() { return "initiator"; }
    getExtra() { return [`Контроль: ${this.control}`, `Ультимейт: ${this.ultimate}`]; }

    update(data) {
        super.update(data);
        this.control = data.control;
        this.ultimate = data.ultimate;
    }

    toJSON() {
        return { ...super.toJSON(), control: this.control, ultimate: this.ultimate };
    }
}

const STORAGE_KEY = "lab5_dota2_cards";

const baseCards = [
    new CarryCard(
        "preset-1",
        "Juggernaut",
        "Универсальный керри-герой, способный наносить высокий урон и быстро вступать в бой.",
        4,
        "Легендарная",
        "После атаки получает бонус к урону в следующем ходу.",
        9,
        "Omnislash"
    ),
    new SupportCard(
        "preset-2",
        "Crystal Maiden",
        "Саппорт, дающий контроль и восстановление ресурсов команде.",
        3,
        "Эпическая",
        "Уменьшает стоимость следующей карты союзника и замедляет противника.",
        8,
        "Freezing Field"
    ),
    new InitiatorCard(
        "preset-3",
        "Axe",
        "Инициатор, который первым врывается в драку и удерживает врагов.",
        5,
        "Легендарная",
        "Стягивает внимание врагов на себя и даёт союзникам окно для атаки.",
        10,
        "Berserker's Call"
    )
];

let state = {
    editMode: false,
    presetCards: [],
    customCards: []
};

document.addEventListener("DOMContentLoaded", init);

function init() {
    loadState();
    buildPage();
}

function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        state = {
            editMode: false,
            presetCards: cloneCards(baseCards),
            customCards: []
        };
        saveState();
        return;
    }

    try {
        const saved = JSON.parse(raw);
        state.editMode = !!saved.editMode;
        state.presetCards = restoreCards(saved.presetCards, baseCards);
        state.customCards = restoreCards(saved.customCards, []);
    } catch {
        state = {
            editMode: false,
            presetCards: cloneCards(baseCards),
            customCards: []
        };
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        editMode: state.editMode,
        presetCards: state.presetCards.map(card => card.toJSON()),
        customCards: state.customCards.map(card => card.toJSON())
    }));
}

function cloneCards(cards) {
    return cards.map(card => createCard(card.toJSON()));
}

function restoreCards(saved, fallback) {
    if (!Array.isArray(saved) || saved.length === 0) return cloneCards(fallback);
    return saved.map(createCard);
}

function createCard(data) {
    if (data.classType === "CarryCard") {
        return new CarryCard(data.id, data.name, data.description, data.cost, data.rarity, data.effect, data.damage, data.skill, data.preset);
    }
    if (data.classType === "SupportCard") {
        return new SupportCard(data.id, data.name, data.description, data.cost, data.rarity, data.effect, data.supportPower, data.item, data.preset);
    }
    return new InitiatorCard(data.id, data.name, data.description, data.cost, data.rarity, data.effect, data.control, data.ultimate, data.preset);
}

function buildPage() {
    document.body.innerHTML = "";
    document.body.append(buildHeader(), buildMain());
}

function buildHeader() {
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
        <div class="header-inner">
            <div class="brand">
                <h1>Колода карт Dota 2</h1>
            </div>
            <div class="header-actions"></div>
        </div>
    `;

    const actions = header.querySelector(".header-actions");

    const editBtn = button(
        state.editMode ? "Выключить редактирование" : "Включить редактирование",
        state.editMode ? "button danger" : "button primary",
        toggleEditMode
    );

    actions.append(editBtn);
    return header;
}

function buildMain() {
    const main = document.createElement("main");
    main.className = "page-wrapper";
    main.append(buildContent());
    return main;
}

function buildContent() {
    const wrapper = document.createElement("div");
    wrapper.className = "content-grid";
    wrapper.append(buildSidebar(), buildDeck());
    return wrapper;
}

function buildSidebar() {
    const aside = document.createElement("aside");
    aside.className = "sidebar";
    const section = document.createElement("section");
    section.innerHTML = `<h2>Добавить карту</h2>`;
    const form = document.createElement("form");
    form.id = "add-card-form";
    form.append(
        field("new-name", "Название героя"),
        textareaField("new-description", "Описание карты"),
        numberField("new-cost", "Количество маны", 0, 20),
        field("new-rarity", "Редкость"),
        textareaField("new-effect", "Эффект карты"),
        selectField("new-type", "Тип карты", [
            ["CarryCard", "Керри"],
            ["SupportCard", "Саппорт"],
            ["InitiatorCard", "Инициатор"]
        ]),
        numberField("new-a", "Особенность 1 (Керри - урон, Саппорт - поддержка, Инициатор - контроль)", 1, 100),
        field("new-b", "Ультимейт"),
        button("Создать карту", "button success", null, "submit"),
        messageBlock("add-card-message")
    );

    form.addEventListener("submit", addCard);
    section.append(form);
    aside.append(section);

    return aside;
}

function buildDeck() {
    const area = document.createElement("div");
    area.className = "deck-area";
    area.append(buildPresetSection(), buildCustomSection());
    return area;
}

function buildPresetSection() {
    const section = document.createElement("section");
    section.className = "section-block";
    const grid = document.createElement("div");
    grid.className = "cards-grid";
    state.presetCards.forEach(card => grid.append(card.render(state.editMode)));
    section.append(grid);
    return section;
}

function buildCustomSection() {
    const section = document.createElement("section");
    section.className = "section-block";
    const title = document.createElement("h2");
    title.textContent = "Добавленные карты";
    const text = document.createElement("p");
    section.append(title);
    const grid = document.createElement("div");
    grid.className = "cards-grid";
    state.customCards.forEach(card => grid.append(card.render(false)));
    section.append(grid);

    return section;
}

function addCard(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const msg = form.querySelector("#add-card-message");
    clearMessage(msg);

    try {
        const type = form.querySelector("#new-type").value;
        const id = "custom-" + Date.now();
        const data = {
            id,
            name: form.querySelector("#new-name").value,
            description: form.querySelector("#new-description").value,
            cost: form.querySelector("#new-cost").value,
            rarity: form.querySelector("#new-rarity").value,
            effect: form.querySelector("#new-effect").value,
            a: form.querySelector("#new-a").value,
            b: form.querySelector("#new-b").value
        };

        let card;

        if (type === "CarryCard") {
            card = new CarryCard(id, data.name, data.description, data.cost, data.rarity, data.effect, data.a, data.b, false);
        } else if (type === "SupportCard") {
            card = new SupportCard(id, data.name, data.description, data.cost, data.rarity, data.effect, data.a, data.b, false);
        } else {
            card = new InitiatorCard(id, data.name, data.description, data.cost, data.rarity, data.effect, data.a, data.b, false);
        }

        state.customCards.unshift(card);
        saveState();
        buildPage();
    } catch (error) {
        showMessage(msg, error.message, true);
    }
}

function deleteCustomCard(id) {
    if (!confirm("Удалить карту?")) return;
    state.customCards = state.customCards.filter(card => card.id !== id);
    saveState();
    buildPage();
}

function toggleEditMode() {
    state.editMode = !state.editMode;
    saveState();
    buildPage();
}

function createEditPanel(card) {
    const section = document.createElement("section");
    section.className = "edit-panel";
    const title = document.createElement("h4");
    title.textContent = "Редактирование карты";
    const form = document.createElement("form");
    form.append(
        field(`edit-name-${card.id}`, "Название героя", card.name, true),
        textareaField(`edit-description-${card.id}`, "Описание карты", card.description, true),
        numberField(`edit-cost-${card.id}`, "Стоимость маны", 0, 20, card.cost, true),
        field(`edit-rarity-${card.id}`, "Редкость", card.rarity, true),
        textareaField(`edit-effect-${card.id}`, "Эффект карты", card.effect, true),
        ...extraFields(card),
        button("Сохранить изменения", "button primary", null, "submit"),
        messageBlock(`msg-${card.id}`)
    );

    form.addEventListener("submit", (event) => saveEdit(event, card));
    section.append(title, form);
    return section;
}

function saveEdit(event, card) {
    event.preventDefault();
    const form = event.currentTarget;
    const msg = form.querySelector(".form-message");
    clearMessage(msg);

    try {
        const base = {
            name: form.querySelector(`#edit-name-${card.id}`).value,
            description: form.querySelector(`#edit-description-${card.id}`).value,
            cost: form.querySelector(`#edit-cost-${card.id}`).value,
            rarity: form.querySelector(`#edit-rarity-${card.id}`).value,
            effect: form.querySelector(`#edit-effect-${card.id}`).value
        };

        if (card instanceof CarryCard) {
            card.update({
                ...base,
                damage: form.querySelector(`#extra-a-${card.id}`).value,
                skill: form.querySelector(`#extra-b-${card.id}`).value
            });
        } else if (card instanceof SupportCard) {
            card.update({
                ...base,
                supportPower: form.querySelector(`#extra-a-${card.id}`).value,
                item: form.querySelector(`#extra-b-${card.id}`).value
            });
        } else {
            card.update({
                ...base,
                control: form.querySelector(`#extra-a-${card.id}`).value,
                ultimate: form.querySelector(`#extra-b-${card.id}`).value
            });
        }

        saveState();
        buildPage();
    } catch (error) {
        showMessage(msg, error.message, true);
    }
}

function extraFields(card) {
    if (card instanceof CarryCard) {
        return [
            numberField(`extra-a-${card.id}`, "Урон", 1, 100, card.damage, true),
            field(`extra-b-${card.id}`, "Способность", card.skill, true)
        ];
    }

    if (card instanceof SupportCard) {
        return [
            numberField(`extra-a-${card.id}`, "Поддержка", 1, 100, card.supportPower, true),
            field(`extra-b-${card.id}`, "Ультимейт", card.item, true)
        ];
    }

    return [
        numberField(`extra-a-${card.id}`, "Контроль", 1, 100, card.control, true),
        field(`extra-b-${card.id}`, "Ультимейт", card.ultimate, true)
    ];
}

function field(id, labelText, value = "", filled = false) {
    const div = document.createElement("div");
    div.className = "form-group";
    div.innerHTML = `<label for="${id}">${labelText}</label><input type="text" id="${id}" name="${id}">`;
    const input = div.querySelector("input");
    filled ? input.value = value : input.placeholder = value;
    return div;
}

function textareaField(id, labelText, value = "", filled = false) {
    const div = document.createElement("div");
    div.className = "form-group";
    div.innerHTML = `<label for="${id}">${labelText}</label><textarea id="${id}" name="${id}"></textarea>`;
    const textarea = div.querySelector("textarea");
    filled ? textarea.value = value : textarea.placeholder = value;
    return div;
}

function numberField(id, labelText, min, max, value = "", filled = false) {
    const div = document.createElement("div");
    div.className = "form-group";
    div.innerHTML = `<label for="${id}">${labelText}</label><input type="number" id="${id}" name="${id}" min="${min}" max="${max}">`;
    const input = div.querySelector("input");
    filled ? input.value = value : input.placeholder = value;
    return div;
}

function selectField(id, labelText, items) {
    const div = document.createElement("div");
    div.className = "form-group";
    div.innerHTML = `<label for="${id}">${labelText}</label><select id="${id}" name="${id}"></select>`;
    const select = div.querySelector("select");

    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item[0];
        option.textContent = item[1];
        select.append(option);
    });

    return div;
}

function button(text, className, handler = null, type = "button") {
    const btn = document.createElement("button");
    btn.className = className;
    btn.type = type;
    btn.textContent = text;
    if (handler) btn.addEventListener("click", handler);
    return btn;
}

function messageBlock(id) {
    const div = document.createElement("div");
    div.id = id;
    div.className = "form-message";
    return div;
}

function showMessage(el, text, error = false) {
    el.textContent = text;
    el.className = `form-message ${error ? "error" : "success"}`;
}

function clearMessage(el) {
    el.textContent = "";
    el.className = "form-message";
}