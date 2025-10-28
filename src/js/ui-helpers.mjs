export function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

export function highlightJWT(jwt, jwtHighlighted) {
    if (!jwt) {
        jwtHighlighted.innerHTML = '';
        return;
    }

    const parts = jwt.split('.');
    if (parts.length === 3) {
        const highlighted = `<span class="jwt-part-header">${escapeHtml(parts[0])}</span><span class="jwt-part-dot">.</span><span class="jwt-part-payload">${escapeHtml(parts[1])}</span><span class="jwt-part-dot">.</span><span class="jwt-part-signature">${escapeHtml(parts[2])}</span>`;
        jwtHighlighted.innerHTML = highlighted;
    } else {
        jwtHighlighted.textContent = jwt;
    }
}

export function syncScroll(jwtInput, jwtHighlighted) {
    jwtHighlighted.scrollTop = jwtInput.scrollTop;
    jwtHighlighted.scrollLeft = jwtInput.scrollLeft;
}