<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Events\TransactionBeginning;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

abstract class CrudController extends Controller
{
    protected $model;
    protected $index = '';
    protected $form = '';
    protected $show = '';
    protected $perPage = 10;

    protected $indexUrl = '';
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function index()
    {

        $items = $this->model->with($this->withRelation());
        $items = $items->paginate($this->perPage);   
        return Inertia::render($this->index, ['items' => $items]);
    }

    protected function defaultOrder($q){
        return $q;
    }

    
    protected function defaultFilter(){
        return [];
    }

    protected function withRelation()
    {
        return [];
    }

    public function create()
    {
        $setImage = $this->additionalItem();
        return Inertia::render($this->form, ['additionalItem' => $additionalItem]);
    }

    public function store(Request $request)
    {

        $this->validate($request, $this->validationRules()); 
        DB::beginTransaction();
        try {
            // dd($request->all());
            $requestData = $request->only($this->model->getFillable());
            $this->model->create($requestData);
            DB::commit();
            return redirect()->route($this->indexUrl);

        } catch (\Exception $e) {
            //throw $th;
            DB::rollBack();

            dd($e);
        }
    }

    public function show($id)
    {
        $item = $this->model->with($this->withRelation())->findOrFail($id);  
        return Inertia::render($this->show, compact('item'));
    }

    public function edit($id)
    {
        $item = $this->model->findOrFail($id);

        $additionalItem = $this->additionalItem();

        return Inertia::render($this->form, ['item' => $item, 'additionalItem' => $additionalItem]);
    }

    public function update(Request $request, $id)
    {
        try {
            $item = $this->model->findOrFail($id); 
            $requestData = $request->only($this->model->getFillable()); 
            if (request()->hasFile('image')) {  
                $file = $request->file('image');
                $originalFilename = $file->getClientOriginalName();
                if($originalFilename != "blob"){ 
                    $item->touch();
                }

            }
            $item->update($requestData);
            
            return redirect()->route($this->indexUrl);
        } catch (\Exception $e) {
            //throw $th;
            dd($e);
            return response()->json(['message' => $e->getMessage()]);
        }


        return redirect()->back();
    }

    public function destroy($id)
    {
        $item = $this->model->findOrFail($id);
        $item->delete();
        return redirect()->route($this->indexUrl);
    }

    protected function validationRules()
    {
        return [];
    }

    protected function additionalItem()
    {
        return [];
    }

    
}
