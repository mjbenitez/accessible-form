import { fixture, html, expect } from '@open-wc/testing';
import axe from "axe-core";
import  '../components/AccessibleForm';
import type { AccessibleForm } from '../components/AccessibleForm';

describe('AccessibleForm', () => {
  let el: AccessibleForm;

  beforeEach(async () => {
    el = await fixture<AccessibleForm>(html`<accessible-form></accessible-form>`);
  });

  it('should be accessible', async () => {
    await expect(el).to.be.accessible();
  });

 it("passes accessibility audit", async () => {
    const results = await axe.run(el);

    expect(results.violations.length).to.equal(0);
  });

  it('should have proper form labeling', async () => {
    const form = el.shadowRoot!.querySelector('form');
    expect(form).to.have.attribute('aria-labelledby', 'formTitle');
    
    const title = el.shadowRoot!.querySelector('h2#formTitle');
    expect(title).to.exist;
    expect(title!.textContent).to.equal('User Info Form');
  });

it('should show error state accessibly', async () => {
    const submitBtn = el.shadowRoot!.querySelector('#submitBtn') as HTMLButtonElement;
    submitBtn.click();
    
    await (el as AccessibleForm).updateComplete;
    
    const input = el.shadowRoot!.querySelector('input#name');
    expect(input).to.have.class('error');
    
    const feedback = el.shadowRoot!.querySelector('.feedback');
    expect(feedback).to.have.attribute('aria-live', 'assertive');
    expect(feedback!.textContent).to.include('Name is required');
  });

 it('should have proper focus management', async () => {
  // Obtener el botón dentro del shadowRoot
  const submitBtn = el.shadowRoot?.querySelector('#submitBtn') as HTMLButtonElement;
  
  // Verificar que el botón existe
  expect(submitBtn).to.exist;
  
  // Verificar el atributo tabindex
  expect(submitBtn).to.have.attribute('tabindex', '0');
  
  // Verificar que el foco está en el botón
  await new Promise(resolve => setTimeout(resolve, 0)); // Esperar un ciclo de eventos
  expect(document.activeElement).to.equal(el); // El componente debería estar enfocado
  expect(el.shadowRoot?.activeElement).to.equal(submitBtn); // El botón debería ser el activo dentro del shadow DOM
});


  it('should handle keyboard events properly', async () => {
    const submitBtn = el.shadowRoot!.querySelector('#submitBtn') as HTMLButtonElement;
    
    // Simular tecla Enter
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    submitBtn.dispatchEvent(enterEvent);
    await (el as AccessibleForm).updateComplete;
    
    const feedback = el.shadowRoot!.querySelector('.feedback');
    expect(feedback!.textContent).to.include('Name is required');
    
    // Simular tecla Espacio
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    submitBtn.dispatchEvent(spaceEvent);
    await (el as AccessibleForm).updateComplete;
    
    expect(feedback!.textContent).to.include('Name is required');
  });

  it('should dispatch custom event on successful submission', async () => {
    let eventFired = false;
    let eventDetail: any = null;
    
    el.addEventListener('form-submitted', (e: Event) => {
      eventFired = true;
      eventDetail = (e as CustomEvent).detail;
    });
    
    const nameInput = el.shadowRoot!.querySelector('input#name') as HTMLInputElement;
    nameInput.value = 'John Doe';
    
    const submitBtn = el.shadowRoot!.querySelector('#submitBtn') as HTMLButtonElement;
    submitBtn.click();
    
    await (el as AccessibleForm).updateComplete;
    
    expect(eventFired).to.be.true;
    expect(eventDetail).to.deep.equal({ name: 'John Doe' });
  });

});
