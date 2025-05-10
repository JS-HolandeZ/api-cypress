/// <reference types="cypress" />

// Declaração dos valores do obj
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


describe('CRUD de API Tests usando JSONPlaceholder com (TypeScript)', () => {
  const baseUrl: string = 'https://jsonplaceholder.typicode.com';
  let createdPostId: number;

  it('GET - Listar posts', () => {
    cy.request<Post[]>('GET', `${baseUrl}/posts`).then((response: Cypress.Response<Post[]>) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(100);
      cy.log('GET concluído');
    });
  });

  it('POST - Criar novo post', () => {
    const newPost = {
      title: 'Post via Cypress TypeScript',
      body: 'Conteúdo gerado via teste',
      userId: 1
    };

    cy.request<Post>('POST', `${baseUrl}/posts`, newPost).then((response: Cypress.Response<Post>) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      createdPostId = response.body.id;
      cy.log(`Novo post criado com ID: ${createdPostId}`);
    });
  });

  it('PUT - Atualizar post', () => {
    const updatedPost = {
      id: 1, // jsonplaceholder sempre responde com id 1 no PUT
      title: 'Título atualizado via Cypress',
      body: 'Conteúdo atualizado via teste',
      userId: 1
    };

    cy.request<Post>('PUT', `${baseUrl}/posts/1`, updatedPost).then((response: Cypress.Response<Post>) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('title', updatedPost.title);
      cy.log('PUT concluído');
    });
  });

  it('DELETE - Deletar post', () => {
    cy.request('DELETE', `${baseUrl}/posts/1`).then((response: Cypress.Response<{}>) => {
      expect(response.status).to.eq(200);
      cy.log('DELETE concluído');
    });
  });
});
