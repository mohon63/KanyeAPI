const loadBuddies = () => {
    fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(data => displayBuddies(data))
};
loadBuddies();

const displayBuddies = data => {
    console.log(data.results)
    const buddies = data.results;
    const buddiesDiv = document.getElementById('buddies');
    for (const buddy of buddies) {
        const p = document.createElement('p');
        p.innerText = `
        My name is ${buddy.name.title.first} and email: ${buddy.email}
        `;
        buddiesDiv.appendChild(p)

        console.log(buddy)
    };
};