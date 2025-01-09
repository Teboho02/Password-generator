
class PasswordGenerator {
    constructor() {
        this.lowercase = 'abcdefghijklmnopqrstuvwxyz';
        this.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.numbers = '0123456789';
        this.symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        this.history = [];
        
        this.generateBtn = document.getElementById('generate');
        this.passwordDisplay = document.querySelector('.password-text');
        this.numbersCheckbox = document.getElementById('numbers');
        this.symbolsCheckbox = document.getElementById('symbols');
        this.copyBtn = document.querySelector('.copy-btn');
        this.historyContainer = document.querySelector('.history');

      
        this.generateBtn.addEventListener('click', () => this.generatePassword());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
    }

    getRandomChar(str) {
        return str.charAt(Math.floor(Math.random() * str.length));
    }

    generatePassword() {
        let charset = this.lowercase + this.uppercase;
        if (this.numbersCheckbox.checked) charset += this.numbers;
        if (this.symbolsCheckbox.checked) charset += this.symbols;

        const length = Math.floor(Math.random() * (7)) + 10;
        let password = '';

        
        password += this.getRandomChar(this.lowercase);
        password += this.getRandomChar(this.uppercase);
        for (let i = password.length; i < length; i++) {
            password += this.getRandomChar(charset);
        }

        // Shuffle the password
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        this.passwordDisplay.textContent = password;
        this.addToHistory(password);
    }

    addToHistory(password) {
        this.history.unshift(password);
        //if (this.history.length > 5) //this.history.pop()
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        this.historyContainer.innerHTML = '<h3>History (This Session)</h3>';
        this.history.forEach(pass => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.textContent = pass;
            this.historyContainer.appendChild(div);
        });
    }

    async copyToClipboard() {
        const password = this.passwordDisplay.textContent;
        if (password === 'Click Generate to start') return;

        try {
            await navigator.clipboard.writeText(password);
            this.copyBtn.textContent = 'Copied!';
            this.copyBtn.classList.add('copied');
            
            setTimeout(() => {
                this.copyBtn.textContent = 'Copy';
                this.copyBtn.classList.remove('copied');
            }, 1000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
}


const passwordGen = new PasswordGenerator();
