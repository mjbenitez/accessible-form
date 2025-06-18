import { LitElement, html, css } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

@customElement('accessible-form')
export class AccessibleForm extends LitElement {
  // Configure Shadow DOM options
  static override readonly shadowRootOptions: ShadowRootInit = {
    mode: 'open' as ShadowRootMode, // Open mode allows external access
    delegatesFocus: true, // Enables focus delegation within shadow DOM
  };

  @state() accessor feedbackMessage = ''; // Stores form feedback messages
  @state() accessor hasError = false;    // Tracks if form has validation errors

  // DOM element references
  @query('#name') private accessor nameInput!: HTMLInputElement; 
  @query('#submitBtn') private accessor submitBtn!: HTMLButtonElement; 

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      padding: 1rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 2px solid #ccc;
      border-radius: 4px;
    }
    input.error {
      border-color: red; /* Error state styling */
    }
    button {
      padding: 0.5rem 1rem;
      background: #005fcc;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:focus {
      outline: 2px solid #ffcc00; /* High visibility focus indicator */
    }
    .feedback {
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }
    .feedback[aria-live="polite"] {
      color: green; /* Success message styling */
    }
    .feedback[aria-live="assertive"] {
      color: red; /* Error message styling */
    }
  `;

  firstUpdated() {
    // Ensure submit button is focusable
    this.submitBtn.setAttribute('tabindex', '0');
    // Set initial focus to submit button for better keyboard navigation
    this.submitBtn.focus();
  }

  // Handle keyboard events for accessibility
  private _handleKeydown(e: KeyboardEvent) {
    // Trigger form submission on Enter or Space key
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._submitForm();
    }
  }

  // Form submission logic
  private _submitForm() {
    const name = this.nameInput.value.trim();
    
    // Validation check
    if (!name) {
      this.hasError = true;
      this.feedbackMessage = 'Name is required';
      return;
    }
    
    // Successful submission
    this.hasError = false;
    this.feedbackMessage = `Submitted: ${name}`;
    
    // Dispatch custom event with submission data
    this.dispatchEvent(
      new CustomEvent('form-submitted', {
        detail: { name },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <form
        aria-labelledby="formTitle" 
        @submit=${(e: Event) => e.preventDefault()} 
        novalidate               
      >
        <h2 id="formTitle">Accessible Form</h2>
        
        <div class="form-group">
          <label for="name">Name</label> 
          <input
            id="name"
            name="name"
            type="text"
            .value=${''}
            aria-label="Your name"        
            class=${this.hasError ? 'error' : ''}  
            required                   
          />
        </div>
        
        <button
          id="submitBtn"
          role="button"                  
          aria-label="Submit the form"   
          @click=${this._submitForm}      
          @keydown=${this._handleKeydown} 
        >
          <slot name="submit-text">Submit</slot> 
        </button>
      </form>
      
      <div
        class="feedback"
        aria-live=${this.hasError ? 'assertive' : 'polite'}
      >
        ${this.feedbackMessage}          
      </div>
    `;
  }
}