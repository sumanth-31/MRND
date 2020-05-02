import logging
def f3():
    logger.info('entering p1.p2.m2.f3')
    logger.info('exiting p1.p2.m2.f3')
def f4():
    logger.info('entering p1.p2.m2.f4')
    logger.info('exiting p1.p2.m2.f4')
logger=logging.getLogger(__name__)
filehandler=logging.FileHandler(filename='p2.log')
filehandler.setLevel(logging.INFO)
streamhandler=logging.StreamHandler()
streamhandler.setLevel(logging.WARNING)
logger.addHandler(filehandler)
logger.addHandler(streamhandler)
logger.setLevel(logging.INFO)
logger.propagate=False