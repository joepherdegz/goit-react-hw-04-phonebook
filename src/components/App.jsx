import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { SearchFilter } from './SearchFilter/SearchFilter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

// componentDidMount() invoked after a component has been rendered to the DOM

  componentDidMount() {
    // If 'contacts' key in LS is not null, we write it in the 'contacts' state
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts !== null) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
    console.log('componentDidMount()');
  }

// componentDidUpdate() after a component is updated
componentDidUpdate(_prevProps, prevState) {
    // if 'contacts' state is updated, set value to localStorage
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    console.log('componentDidUpdate()');
  }
  
  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  setFilter = filterValue => {
    this.setState({
      filter: filterValue,
    });
  };

  filterContact = () => {
    const { contacts, filter } = this.state;
    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} contacts={contacts} />

        <h2>Contacts</h2>
        <SearchFilter filter={filter} setFilter={this.setFilter} />
        <ContactList
          filterContact={this.filterContact}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}