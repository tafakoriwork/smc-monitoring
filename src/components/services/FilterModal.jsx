function FilterModal(props) {
    const {setFilterActive,setFilterSub,setFilterLoad, filters} = props;
  return (
    <div className="bg-light filter_modal" style={{ width: "250px" }}>
      <div className="row">
        <div className="row justify-content-center">
          <div className="col-4 text-start">
            <label htmlFor="active" style={{fontSize: '12px', marginTop: '5px'}}>active</label>
          </div>
          <div className="col-2 text-end">
            <input checked={filters.active.includes('active') && true} type="checkbox" id="active" onChange={() => setFilterActive('active')}/>
          </div>
          <div className="col-4 text-start">
            <label htmlFor="inactive" style={{fontSize: '12px', marginTop: '5px'}}>inactive</label>
          </div>
          <div className="col-2 text-end">
            <input checked={filters.active.includes('inactive') && true} type="checkbox" id="inactive" onChange={() => setFilterActive('inactive')}/>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-3 text-start">
            <label htmlFor="load" style={{fontSize: '12px', marginTop: '5px'}}>loaded</label>
          </div>
          <div className="col-2 text-end">
            <input type="checkbox" checked={filters.load.includes('loaded') && true} id="load" onChange={() => setFilterLoad('loaded')}/>
          </div>
          <div className="col-5 text-start">
            <label htmlFor="not-found" style={{fontSize: '12px', marginTop: '5px'}}>not-found</label>
          </div>
          <div className="col-2 text-end">
            <input type="checkbox" checked={filters.load.includes('not-found') && true} id="not-found" onChange={() => setFilterLoad('not-found')}/>
          </div>
        </div>
        <hr />
        <div className="row">
        <div className="col-3 text-start">
            <label htmlFor="dead" style={{fontSize: '12px', marginTop: '5px'}}>dead</label>
          </div>
          <div className="col-1 text-end px-0">
            <input type="checkbox" checked={filters.sub.includes('dead') && true} id="dead" onChange={() => setFilterSub('dead')}/>
          </div>
          <div className="col-3 text-start">
            <label htmlFor="running" style={{fontSize: '12px', marginTop: '5px'}}>running</label>
          </div>
          <div className="col-1 text-end px-0">
            <input type="checkbox" checked={filters.sub.includes('running') && true} id="running" onChange={() => setFilterSub('running')}/>
          </div>
          <div className="col-3 text-start">
            <label htmlFor="exited" style={{fontSize: '12px', marginTop: '5px'}}>exited</label>
          </div>
          <div className="col-1 text-end px-0">
            <input type="checkbox" id="exited" checked={filters.sub.includes('exited') && true} onChange={() => setFilterSub('exited')}/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FilterModal;
