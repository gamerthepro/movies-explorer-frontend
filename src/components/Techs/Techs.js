import './Techs.css'

const Techs = () => {
   return (
      <section className='techs'>
         <div className='techs__content'>
            <h3 className='techs__header-text'>Технологии</h3>
            <h2 className='techs__title'>7 технологий</h2>
            <p className='techs__paragraph'>На курсе веб-разработки мы освоили технологии, которые применили в
               дипломном проекте.</p>
            <ul className='techs__stacks'>
					<li className='techs__element'>HTML</li>
					<li className='techs__element'>CSS</li>
					<li className='techs__element'>JS</li>
					<li className='techs__element'>React</li>
					<li className='techs__element'>Git</li>
					<li className='techs__element'>Express.js</li>
					<li className='techs__element'>mongoDB</li>
				</ul>    
         </div>
      </section>
   )
}

export default Techs;