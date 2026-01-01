const ContentPanel = ({ content, contentMap }) => {
  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
        <div className = "w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth custom-scrollbar">
        {content.map(item => {
            // get component from object
            const Component = contentMap[item.type];

            // render component 
            return <Component key={item.id}/>
          })}

          {/* <ScrollProgressIndicator
            sectionRef = {ref}
            sectionCount={content.length} 
          /> */}
        </div>
    </div>
  );
};

export default ContentPanel;
