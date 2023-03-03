interface AbstractService<T,C,U> {
 
 create(data:C): Promise<T>;
 findAll(): Promise<T[]>;
 findOne(id: string): Promise<T>
 remove(id: string): Promise<T>;
 update(id: string, data: U): Promise<T>;
}