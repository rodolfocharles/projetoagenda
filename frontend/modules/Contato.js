import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            //alert('FORM NÃO ENVIADO.');
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        let error = false;

        // Validação do nome - verifica se não está vazio
        if (!nomeInput.value || validator.isEmpty(nomeInput.value.trim())) {
            alert('Nome é obrigatório.');
            error = true;
        } 
        // Validação do email - só valida se tiver algo digitado
        else if (emailInput.value && !validator.isEmail(emailInput.value)) {
            alert('E-mail inválido');
            error = true;
        } 
        // Validação se pelo menos email OU telefone foi preenchido
        else if (!emailInput.value && !telefoneInput.value) {
            alert('Cadastro de um contato precisa ter pelo menos um email ou telefone.');
            error = true;
        }

        if(!error) el.submit();

        console.log(nomeInput.value);
    }


}