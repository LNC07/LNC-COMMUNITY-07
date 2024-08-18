let balance = 0;
let level = 1;
let perClickCoins = 1;
let dailyLimit = 1000;
let earnedToday = 0;
let botBought = false;

// Load saved data
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('balance')) {
        balance = parseInt(localStorage.getItem('balance'), 10);
    }
    if (localStorage.getItem('level')) {
        level = parseInt(localStorage.getItem('level'), 10);
        perClickCoins = level;
    }
    if (localStorage.getItem('dailyLimit')) {
        dailyLimit = parseInt(localStorage.getItem('dailyLimit'), 10);
    }
    if (localStorage.getItem('botBought') === 'true') {
        botBought = true;
        document.getElementById('claim-bot-section').style.display = "block";
    }
    updateUI();
});

function updateUI() {
    document.getElementById('balance').textContent = balance;
    document.getElementById('level').textContent = level;
    document.getElementById('upgrade-cost').textContent = level * 500;
    document.getElementById('limit').textContent = dailyLimit;
    document.getElementById('limit-cost').textContent = dailyLimit * 1.5;
}

// Click on coin
document.getElementById('coin').addEventListener('click', function() {
    if (earnedToday < dailyLimit) {
        balance += perClickCoins;
        earnedToday += perClickCoins;
        localStorage.setItem('balance', balance);
        localStorage.setItem('earnedToday', earnedToday);
        updateUI();
    } else {
        alert("Daily limit reached!");
    }
});

// Task button to open modal
document.getElementById('tasks').addEventListener('click', function() {
    document.getElementById('task-modal').style.display = "block";
});

// Boost button to open modal
document.getElementById('boost').addEventListener('click', function() {
    document.getElementById('boost-modal').style.display = "block";
});

// Withdrawal button
document.getElementById('withdrawal').addEventListener('click', function() {
    alert("Coin listed on October 25, 2024");
});

// Close modals
let modals = document.getElementsByClassName('close');
for (let i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function() {
        this.parentElement.parentElement.style.display = 'none';
    });
}

// Claim reward for joining channel
document.getElementById('claim-reward').addEventListener('click', function() {
    if (localStorage.getItem('rewardClaimed') !== 'true') {
        balance += 1000;
        localStorage.setItem('balance', balance);
        localStorage.setItem('rewardClaimed', 'true');
        updateUI();
        alert("1000 coins added for joining the channel!");
    } else {
        alert("Reward already claimed!");
    }
});

// Upgrade level
document.getElementById('upgrade').addEventListener('click', function() {
    let upgradeCost = level * 500;
    if (balance >= upgradeCost) {
        balance -= upgradeCost;
        level++;
        perClickCoins++;
        localStorage.setItem('balance', balance);
        localStorage.setItem('level', level);
        localStorage.setItem('perClickCoins', perClickCoins);
        updateUI();
        alert("Level upgraded!");
    } else {
        alert("Not enough coins to upgrade!");
    }
});

// Upgrade daily limit
document.getElementById('upgrade-limit').addEventListener('click', function() {
    let limitUpgradeCost = dailyLimit * 1.5;
    if (balance >= limitUpgradeCost) {
        balance -= limitUpgradeCost;
        dailyLimit += 1000;
                localStorage.setItem('balance', balance);
        localStorage.setItem('dailyLimit', dailyLimit);
        updateUI();
        alert("Daily limit upgraded!");
    } else {
        alert("Not enough coins to upgrade the daily limit!");
    }
});

// Buy bot
document.getElementById('buy-bot').addEventListener('click', function() {
    let buyBotCost = 5000;
    if (balance >= buyBotCost) {
        balance -= buyBotCost;
        botBought = true;
        localStorage.setItem('balance', balance);
        localStorage.setItem('botBought', 'true');
        document.getElementById('claim-bot-section').style.display = "block";
        updateUI();
        alert("Bot bought! Daily 1500 coins will be added.");
    } else {
        alert("Not enough coins to buy the bot!");
    }
});

// Claim bot coins
document.getElementById('claim-bot').addEventListener('click', function() {
    if (botBought) {
        balance += 1500;
        localStorage.setItem('balance', balance);
        updateUI();
        alert("1500 coins added for owning the bot!");
    } else {
        alert("You need to buy the bot first!");
    }
});

