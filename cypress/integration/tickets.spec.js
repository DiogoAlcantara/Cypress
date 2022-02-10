describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    it("Preenchendo todos os campos de texto", () =>{
        const firstName = "Diogo";
        const lastName = "Alcantara";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("teste.teste@gmail.com");
        cy.get("#requests").type("Testando os campos de texto.");
        cy.get("#signature").type(`${fullName}`);

    });

    it("Selecionando dois tickets", () =>{
        cy.get("#ticket-quantity").select("2");
    });

    it("Selecionando o ticket do tipo vip", () => {
        cy.get("#vip").check();
    });

    it("Selecione a opcão 'social media' no checkbox", () => {
        cy.get("#social-media").check();
    });

    it("selecione a opção 'friend' e 'publication', e depois desmarque 'friend'", () =>{
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("Verificando se o header possuí o texto 'TICKETBOX'", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("Alertas para email inválido", () =>{
        cy.get("#email")
            .as("email")
            .type("teste.testegmail.com");
        
        cy.get("#email.invalid").should("exist");
        
        cy.get("@email")
            .clear()
            .type("teste.teste@gmail.com");

        cy.get("#email.invalid").should("not.exist");
    });

    it("Preenchendo e resetando o formulário", () => {
        const firstName = "Diogo";
        const lastName = "Alcantara";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("teste.teste@gmail.com");
        cy.get("#ticket-quantity").select("3");
        cy.get("#vip").check();
        cy.get("#social-media").check();
        cy.get("#requests").type("Tanto faz!."); 

        cy.get(".agreement p").should(
            "contain", 
            `I, ${fullName}, wish to buy 3 VIP tickets.`
        );

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");
        
        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");
    });

    it("Preenchendo os campos obrigatórios, usando comandos de suporte", () => {
        const customizado = {
            firstName: "Diogo",
            lastName: "João",
            email: "diogo.joao@exemplo.com"
        };

        cy.camposObrigatorios(customizado);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");
        
        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");
    });
});