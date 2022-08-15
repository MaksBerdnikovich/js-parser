window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body')
    let textNodes = []

    const sorting = (data) => {
        return [...data].sort((a, b) => a.header.slice(1) - b.header.slice(1))
    }

    const recursy = (elem) => {
        elem.childNodes.forEach(node => {
            if (node.nodeName.match(/^H\d/)) {
                const obj = {
                    header: node.nodeName,
                    content: node.textContent.trim().replace(/[\r\n\t]+/g, '')
                }

                textNodes.push(obj)
            } else {
                recursy(node)
            }
        })
    }
    recursy(body)

    const data = sorting(textNodes)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(() => console.log(data))
})