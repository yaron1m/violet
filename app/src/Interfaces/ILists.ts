export default interface ILists {
    offeredLectures: {[key:string]:boolean};
    cancellationReasons: {[key:string]:string};
    rejectionReasons: {[key:string]:string};
}