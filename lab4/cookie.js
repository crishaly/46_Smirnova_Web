const CookieStore = {
  set(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();

    document.cookie =
      encodeURIComponent(name) +
      "=" +
      encodeURIComponent(value) +
      "; expires=" +
      expires +
      "; path=/";
  },

  get(name) {
    const encodedName = encodeURIComponent(name) + "=";
    const parts = document.cookie.split("; ");

    for (const part of parts) {
      if (part.startsWith(encodedName)) {
        return decodeURIComponent(part.substring(encodedName.length));
      }
    }

    return null;
  },

  remove(name) {
    document.cookie =
      encodeURIComponent(name) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  },

  setJSON(name, value, days = 7) {
    this.set(name, JSON.stringify(value), days);
  },

  getJSON(name) {
    const raw = this.get(name);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
};