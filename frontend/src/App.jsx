import React from 'react';
// eslint-disable-next-line no-unused-vars, sort-imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import AddMovie from './pages/Movies/Movies' ;
import AboutMovie from './pages/AboutMovie/AboutMovie';

function App() {
	return (
	<Layout>
		<Routes>
			<Route path = "/" element = {<Home />} />
			<Route path = "counter" element = {<Counter />} />
			<Route path = "users" element = {<Users />} />
			<Route path = "about" element = {<About />} />
			<Route path = 'add-movie' element = {<AddMovie />} />
			<Route path = "film/:id" element = {<AboutMovie />} />
		</Routes>
	</Layout>
	);
}

export default App;
